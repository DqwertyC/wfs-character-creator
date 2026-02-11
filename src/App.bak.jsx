import {
  FileIcon,
  Download,
  Eye,
  EyeClosed,
  Pause,
  Play,
  Check,
} from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

import { PNG } from "pngjs/browser";

export default function App() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const hiddenFileInput = useRef(null);
  const [fileLoaded, setFileLoaded] = useState(false);

  const [character, setCharacter] = useState(null);

  const handleClick = () => hiddenFileInput.current.click();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target?.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target.result;
        // Read the file data
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  const saveFile = useCallback(() => {
    // Save the .json file
  }, []);

  const copyFile = useCallback(() => {
    const tryCopy = async () => {
      // Copy the .json file to the users clipboard
    };
    tryCopy();
  }, []);

  const newCharacter = useCallback(() => {

  })

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Wingfeather Character Creator
          </h1>
          <p className="text-xl text-gray-400">
            For use with the Wingfeather Saga RPG
          </p>
        </header>

        {fileLoaded ? (
          <main
            className="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <p>Character editor...</p>
          </main>
        ) : (
          <main
            className="bg-gray-800 rounded-lg p-8 shadow-xl flex flex-col"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="flex justify-center mb-4">
              <span>Upload an existing character:</span>
            </div>
            <div className="flex justify-center mb-4">
              <div
                className="w-64 h-32 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="text-center">
                  <FileIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-600">Click or drag to upload</p>
                </div>
              </div>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept=".json"
                className="hidden"
              />
            </div>

            <div className="flex justify-center mb-4">
              <span>OR</span>
            </div>
            <button className="flex space-x-2 px-2 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-center" onClick>
              Create a new Character
            </button>
          </main>
        )}
      </div>
    </div>
  );
}
