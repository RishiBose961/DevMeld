/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditorTheme = () => {
    const themes = ["vs", "vs-dark", "hc-black", "hc-light"];

    const [theme, setTheme] = useState("vs-dark");

    // Load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("editorTheme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const handleThemeChange = (e: { target: { value: any; }; }) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem("editorTheme", selectedTheme);
        toast.success(`Editor theme changed to ${selectedTheme}`);
    };

    return {
        theme,
        handleThemeChange,
        themes,
    }
}

export default EditorTheme