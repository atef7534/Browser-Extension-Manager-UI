import { useState } from "react";
import { useEffect } from "react";
import ExtensionBar from "./components/ExtensionBar.jsx";
import ExtensionList from "./components/ExtensionList.jsx";

function App() {
  const [mode, setMode] = useState("dark");
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);
  return (
    <>
      <ExtensionBar mode={mode} setMode={setMode} />
      <ExtensionList mode={mode} />
    </>
  );
}

export default App;
