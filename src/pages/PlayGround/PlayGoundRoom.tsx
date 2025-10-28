/* eslint-disable @typescript-eslint/no-explicit-any */
import RightSideBar from "@/components/PlayGroundComp/RightSideBar";
import { Editor, type OnChange, type OnMount } from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { io, Socket } from "socket.io-client";

interface User {
  id: string;
  token: string;
  _id: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

interface RootState {
  auth: AuthState;
}

interface RoomState {
  content: string;
  language: string;
  users: User[];
}

const PlayGoundRoom = () => {
  const { roomName } = useParams<{ roomName: string }>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const [code, setCode] = useState<string>("// Start coding...");
  const [language, setLanguage] = useState<string>("javascript");
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const editorRef = useRef<any>(null);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const REALTIME_SERVER = "http://localhost:5001";

  useEffect(() => {
    const socketIo: Socket = io(REALTIME_SERVER);
    socketRef.current = socketIo;

    socketIo.on("connect", () => {
      setIsConnected(true);
      socketIo.emit("join-room", {
        roomName,
        username: user.username,
        userId: user.id,
      });
    });

    socketIo.on("room-state", (data: RoomState) => {
      setCode(data.content);
      setLanguage(data.language);
      setUsers(data.users);
    });

    socketIo.on("yjs-update", (data: any) => {
      if (data.from !== socketIo.id) {
        setCode(data.update.content);
        setLanguage(data.update.language);
      }
    });

    socketIo.on("user-joined", (data: { users: User[] }) => {
      setUsers(data.users);
    });

    socketIo.on("user-left", (data: { users: User[] }) => {
      setUsers(data.users);
    });

    socketIo.on("language-change", (data: { from: string; language: string }) => {
      if (data.from !== socketIo.id) {
        setLanguage(data.language);
      }
    });

    socketIo.on("user-typing", ({ username }: { username: string }) => {
      setTypingUsers((prev) => {
        if (!prev.includes(username)) return [...prev, username];
        return prev;
      });
    });

    socketIo.on("user-stop-typing", ({ username }: { username: string }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [roomName, user]);

  const handleEditorChange: OnChange = async (value) => {
    if (value !== undefined) {
      setCode(value);

      // Broadcast change to other users
      if (socketRef.current) {
        socketRef.current.emit("yjs-update", {
          roomName,
          update: {
            content: value,
            language,
          },
          version: Date.now(),
        });
      }

      // Save content to backend (PUT)
      try {
        await axios.put(
          `http://localhost:5000/api/playground/${roomName}`,
          { content: value },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error saving content:", err);
      }
    }

    // Typing status
    if (socketRef.current) {
      socketRef.current.emit("typing", {
        roomName,
        username: user.username,
      });

      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        socketRef.current?.emit("stop-typing", {
          roomName,
          username: user.username,
        });
      }, 2000);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    socketRef.current?.emit("language-change", {
      roomName,
      language: newLanguage,
    });
  };

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    navigate("/");
  };

  return (
    <div className="grid lg:grid-cols-4 gap-2 mt-2">
      <div className="bg-card lg:h-[calc(100vh-80px)] rounded-xl">
        <RightSideBar
          isConnected={isConnected}
          users={users}
          typingUsers={typingUsers}
          handleLanguageChange={handleLanguageChange}
          socketRef={socketRef}
          leaveRoom={leaveRoom}
          language={language}
        />
      </div>
      <div className="col-span-3 rounded-xl lg:h-[calc(100vh-80px)]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 20,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default PlayGoundRoom;
