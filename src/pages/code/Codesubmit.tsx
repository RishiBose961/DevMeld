import Editor from "@monaco-editor/react";
import { useState } from "react";
import { boilerplates } from "./BoilerPlate";
import { useMutation } from "@tanstack/react-query";
import { createSubmissionSerivice } from "@/services/submissionapi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UseSubmited from "@/components/hook/validhook/UseSubmited";

const Codesubmit = () => {
  const location = useLocation();

  const postBy = location.pathname.split("/")[4];
  const topicId = location.pathname.split("/")[2];

   const { isPending: loading, getValidSubmit } = UseSubmited(topicId as string) as {
    isPending: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getValidSubmit: any;
  };

  
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(boilerplates["java"]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const token = user?.token;
  const mutation = useMutation({
    mutationFn: (postData: { code: string; language: string, postId: string,topicId: string }) =>
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
      postId:postBy,
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
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Select Language
        </label>
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Code Solution
          </label>
          <Editor
            height="50vh"
            language={language}
            theme="hc-black"
            value={code}
            onChange={(value) => setCode(value ?? "")}
          />
        </div>
        {
          loading ? (
            <div>Loading...</div>
          ) :  getValidSubmit?.value  ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-md">
              You have already submitted a solution for this topic.
            </div>
          ) :  <button
          onClick={handleSubmit}
          className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
        >
          Submit Solution
        </button>
        }
       
      </div>
    </div>
  );
};

export default Codesubmit;
