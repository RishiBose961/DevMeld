/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatMessage from "@/components/CommunityComp/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCommunityStore from "@/ZustandStore/useCommunityStore";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import Sidebar from "./SideBar";
import useOnlineStore from "@/ZustandStore/useOnlineStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CommunityPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const socketRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string; username: string };
      };
    }) => state.auth
  );

  const { communityId } = useCommunityStore();
  const userName = user?.username || "Anonymous";
  const userId = user?._id || "0";
  const roomId = communityId;

  const { setUsers } = useOnlineStore();

  useEffect(() => {
    if (!roomId) return;

    // fetch persisted messages
    axios
      .get(`${API_URL}/api/communities/${roomId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(r => setMessages(r.data))
      .catch(console.error);

    // connect to socket
    const socket = io(SOCKET_URL, { autoConnect: true });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join", { roomId, userName, userId });
    });

    socket.on("users:list", list => {
      setUsers(list); // [{ userId, userName }]
    });

    socket.on("message:create", msg =>
      setMessages(prev => [...prev, msg])
    );
    socket.on("message:update", msg =>
      setMessages(prev =>
        prev.map(m => (m._id === msg._id ? msg : m))
      )
    );
    socket.on("message:delete", payload =>
      setMessages(prev => prev.filter(m => m._id !== payload._id))
    );

    return () => {
      socket.emit("leave", { roomId, userId });
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userName]);

  async function handleSend() {
    if (!text.trim() || !roomId) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/create/community`,
        { user: userName, text, roomId, senderId: userId },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setText("");
      socketRef.current?.emit("message:create", res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(id: string) {
    const newText = prompt('Edit message text')
    if (!newText) return
    const res = await axios.put(`${API_URL}/api/community/${id}`, {
      newText
    },
      {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
    socketRef.current.emit('message:update', res.data)
  }

  async function handleDelete(id: string) {

    // if (!confirm('Delete message?')) return
    await axios.delete(`${API_URL}/api/community/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    })
    socketRef.current.emit('message:delete', { _id: id, roomId })
  }

  // scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-80px)]">
      <div className="h-full flex">
        <Sidebar id={id ?? ""} />

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            <div className="backdrop-blur-md h-full p-4 rounded-xl bg-card/40 border-t border-border/30">
              <ScrollArea className="h-[750px] mt-4 px-5">
                {!communityId ? (
                  <div className="text-gray-500 text-center p-4">
                    No community selected. Please select a community from the sidebar
                  </div>
                ) : messages.length > 0 ? (
                  <>
                    {messages.map((msg, index) => {
                      const isOwnMessage = msg.senderId === user?._id;
                      return (
                        <div
                          key={msg._id || index}
                          className={`flex mb-2 ${isOwnMessage ? "justify-end" : "justify-start"
                            }`}
                        >
                          <ChatMessage
                            message={msg.text}
                            isOwnMessage={isOwnMessage}
                            name={msg.user?.userName || msg.user || "Anonymous"}
                            date={msg.createdAt}
                            handleDelete={() => handleDelete(msg._id)}
                            handleUpdate={() => handleUpdate(msg._id)}
                          />
                        </div>
                      );
                    })}

                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="text-gray-500 text-center p-4">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* input box remains same */}
          <div className="p-3 sm:p-4 backdrop-blur-md rounded-xl bg-card/40 border-t border-border/30">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Enter Message"
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  className="bg-[var(--chat-input)] border-border/30 backdrop-blur-sm text-foreground placeholder:text-muted-foreground pr-12"
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
