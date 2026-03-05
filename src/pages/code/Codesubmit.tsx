import Editor from "@monaco-editor/react";
import { useState } from "react";
import { boilerplates } from "./BoilerPlate";
import { useMutation } from "@tanstack/react-query";
import { createSubmissionSerivice } from "@/services/submissionapi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UseSubmited from "@/components/hook/validhook/UseSubmited";
import EditorTheme from "@/components/hook/editorTheme/EditorTheme";
import TerminalEdit from "./TerminalEdit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Codesubmit = () => {
  const location = useLocation();
  const [showTerminal, setShowTerminal] = useState(false);

  const postBy = location.pathname.split("/")[4];
  const topicId = location.pathname.split("/")[2];

  const { isPending: loading, getValidSubmit } = UseSubmited(topicId as string) as {
    isPending: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValidSubmit: any;
  };

  const { theme } = EditorTheme();

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(boilerplates["java"]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const token = user?.token;
  const mutation = useMutation({
    mutationFn: (postData: { code: string; language: string, postId: string, topicId: string }) =>
      createSubmissionSerivice(postData, token),
    onSuccess: () => {
      alert("Submission created successfully!");
      // resetForm();
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "message" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        alert((error as any).message || "Failed to create post.");
      } else {
        alert("Failed to create post.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      code,
      language,
      postId: postBy,
      topicId
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value as keyof typeof boilerplates;
    setLanguage(selectedLang);
    setCode(boilerplates[selectedLang]); // load boilerplate for selected language
  };

  return (
    <div className="pt-6 mb-5">
      <div className="mb-6 space-x-3 flex justify-start items-center">
        <div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-2"
          >
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">Go</option>
          </select>
        </div>

        {
          loading ? (
            <div>Loading...</div>
          ) : getValidSubmit?.value ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-md">
              You have already submitted a solution for this topic.
            </div>
          ) : <Button
            onClick={handleSubmit}
            variant="outline"
            className=" cursor-pointer font-mono"
          >
            Submit Solution
          </Button>
        }
        <div className="flex items-center space-x-2">
          <Switch
            id="terminal-mode"
            checked={showTerminal}
            onCheckedChange={setShowTerminal}
          />
          <Label htmlFor="terminal-mode">
            {showTerminal ? "Terminal ON" : "Terminal OFF"}
          </Label>
        </div>
      </div>

      <div className={`space-y-4 grid gap-5 ${showTerminal ? "grid-cols-3" : "grid-cols-1"}`}>
        <div className=" col-span-2">
          <label className="block text-sm font-medium mb-2">
            Code Solution
          </label>
          <Editor
            height="70vh"
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value ?? "")}
          />

        </div>
        <div className="space-y-4">

          {/* Toggle */}


          {/* Terminal */}
          {showTerminal && (
            <div>
              <TerminalEdit language={language} code={code} />
            </div>
          )}

        </div>


      </div>
    </div>
  );
};

export default Codesubmit;
