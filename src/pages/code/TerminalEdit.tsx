/* eslint-disable @typescript-eslint/no-explicit-any */
import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"

import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"

const TerminalEdit = ({ language, code }: { language: string, code: string }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null)
  const termRef = useRef<Terminal | null>(null)
  const { user } = useSelector((state: any) => state.auth);
  const token = user?.token

  // 🔥 TanStack Mutation
  const runMutation = useMutation({
    mutationFn: async ({
      language,
      code
    }: {
      language: string
      code: string
    }) => {
      const res = await axios.post(
        "http://localhost:5000/api/run",
        { language, code }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
      )
      return res.data
    }
  })

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "Consolas, monospace",
      theme: {
        background: "#0d1117",
        foreground: "#c9d1d9",
        cursor: "#58a6ff",
        selectionBackground: "#264f78"
      }
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    if (terminalRef.current) {
      term.open(terminalRef.current)
      fitAddon.fit()
      term.writeln("Welcome to DevMeld Terminal!")
    }

    termRef.current = term

    const handleResize = () => fitAddon.fit()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      term.dispose()
    }
  }, [])

  const handleRun = () => {
    const sampleCode = `
console.log("Hello from backend 🚀")
`

    termRef.current?.writeln("\r\nRunning code...\r\n")

    runMutation.mutate(
      { language: language, code: code || sampleCode },
      {
        onSuccess: (data) => {

       termRef.current?.writeln(
  `\n\x1b[30;42m ${language.toUpperCase()} \x1b[0m Output:\n`
)

termRef.current?.writeln(data || "No output")
        },
        onError: (err: { message: string }) => {
          termRef.current?.writeln("Error: " + err.message)
        }
      }
    )
  }

  return (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-gray-700">

      {/* Header */}
      <div className="h-9 bg-[#161b22] flex items-center justify-between px-3 text-sm text-gray-300 border-b border-gray-700">
        Terminal

        <button
          onClick={handleRun}
          disabled={runMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs"
        >
          {runMutation.isPending ? "Running..." : "Run"}
        </button>
      </div>

      {/* Terminal */}
      <div ref={terminalRef} className="p-2" />
    </div>
  )
}

export default TerminalEdit