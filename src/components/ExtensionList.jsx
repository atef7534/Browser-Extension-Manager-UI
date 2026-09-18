import { useState } from "react";
import data from "../../data.json";

// Tell Vite to include all images in this folder
const images = import.meta.glob("../assets/images/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export default function ExtensionList({ mode }) {
  const [extensions, setExtensions] = useState(data);
  const [showMyCase, setShowMyCase] = useState(0);

  function getImageUrl(path) {
    // Convert "./assets/images/logo-devlens.svg"
    // into "../assets/images/logo-devlens.svg"
    const imagePath = path.replace("./assets/images/", "../assets/images/");

    return images[imagePath];
  }

  function toggleActive(index) {
    setExtensions((items) =>
      items.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  }

  function removeYourItem(index) {
    setExtensions((items) =>
      items.map((item, i) => (i === index ? { ...item, removed: true } : item)),
    );
  }

  function showYourCase(value) {
    setShowMyCase(value);
  }

  const boxes = extensions.map((item, index) => {
    let className = "";

    if (
      (item.isActive && showMyCase === -1) ||
      (!item.isActive && showMyCase === 1) ||
      item.removed
    ) {
      className = "hide";
    }

    return (
      <div className={`extension-box ${className} ${mode}`} key={index}>
        <div className="top">
          <img
            src={getImageUrl(item.logo)}
            alt={`${item.name} icon`}
            className="box-icon"
          />

          <div className="extension-description">
            <h2 className={mode}>{item.name}</h2>
            <p className={mode}>{item.description}</p>
          </div>
        </div>

        <div className="bottom d-flex-between-center">
          <button
            className={`remove ${mode}`}
            onClick={() => removeYourItem(index)}
          >
            Remove
          </button>

          <div
            tabIndex={0}
            className={`is-active ${
              item.isActive ? "active" : "inactive"
            } ${mode}`}
            onClick={() => toggleActive(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                toggleActive(index);
              }
            }}
          >
            <span className="circle"></span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section id="extension-list">
      <div className="extension-list-header d-flex-between-center">
        <h1
          className={`extension-list-title ${
            mode === "light" ? "dark-title" : ""
          }`}
        >
          Extension List
        </h1>

        <ul className="d-flex-center-center">
          <li
            tabIndex={0}
            className={`${
              showMyCase === 0 ? "active" : ""
            } ${mode === "light" ? "light" : "dark"}`}
            onClick={() => showYourCase(0)}
          >
            All
          </li>

          <li
            tabIndex={0}
            className={`${
              showMyCase === 1 ? "active" : ""
            } ${mode === "light" ? "light" : "dark"}`}
            onClick={() => showYourCase(1)}
          >
            Active
          </li>

          <li
            tabIndex={0}
            className={`${
              showMyCase === -1 ? "active" : ""
            } ${mode === "light" ? "light" : "dark"}`}
            onClick={() => showYourCase(-1)}
          >
            Inactive
          </li>
        </ul>
      </div>

      <div className="extensions-list-container">{boxes}</div>
    </section>
  );
}
