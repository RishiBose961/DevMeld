/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (...args: any[]) => void;
      };
    };
  }
}

const Language = () => {
  const [loading, setLoading] = useState(true);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );

    setLoading(false);
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;

    document.body.appendChild(addScript);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div>
      {loading && (
        <div className="text-md text-gray-500 animate-pulse">
          <Loader className=" size-4 animate-spin" />
        </div>
      )}

      <div
        id="google_translate_element"
        style={{ display: loading ? "none" : "block" }}
      ></div>
    </div>
  );
};

export default Language;