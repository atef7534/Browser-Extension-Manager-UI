import darkLogo from "../assets/images/logo.svg";
import lightLogo from "../assets/images/logo-2.svg";

export default function ExtensionBar({ mode, setMode }) {
  function handleMode() {
    setMode((prevValue) => {
      return prevValue === "dark" ? "light" : "dark";
    });
  }

  return (
    <nav
      className={`d-flex-between-center ${
        mode === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      <img src={mode === "dark" ? darkLogo : lightLogo} alt="Extensions logo" />

      <button
        type="button"
        className={`mode ${mode}`}
        onClick={handleMode}
        aria-label="Toggle color mode"
      ></button>
    </nav>
  );
}
