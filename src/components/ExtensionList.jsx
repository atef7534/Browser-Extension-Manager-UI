import { useState } from "react";
import data from "../../data.json";

export default function ExtensionList({ mode }) {
  const [extensions, setExtensions] = useState(data);
  const [showMyCase, setShowMyCase] = useState(0);

  // toggle active when activating our active button
  function toggleActive(index) {
    setExtensions((items) => {
      const newItems = items.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item,
      );
      return newItems;
    });
  }

  function removeYourItem(index) {
    setExtensions((items) => {
      const newItems = items.map((item, i) =>
        i === index ? { ...item, removed: true } : item,
      );
      return newItems;
    });
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
            src={`./src/${item.logo.slice(2)}`}
            alt="Developer icon"
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
            className={`is-active ${item.isActive ? "active" : "inactive"} ${mode}`}
            onClick={() => toggleActive(index)}
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
          className={`extension-list-title ${mode === "light" ? "dark-title" : ""}`}
        >
          Extension List
        </h1>
        <ul className="d-flex-center-center">
          <li
            tabIndex={0}
            className={`${showMyCase === 0 ? "active" : ""} ${mode === "light" ? "light" : "dark"}`}
            onClick={() => showYourCase(0)}
          >
            All
          </li>
          <li
            tabIndex={0}
            className={`${showMyCase === 1 ? "active" : ""} ${mode === "light" ? "light" : "dark"}`}
            onClick={() => showYourCase(1)}
          >
            Active
          </li>
          <li
            tabIndex={0}
            className={`${showMyCase === -1 ? "active" : ""} ${mode === "light" ? "light" : "dark"}`}
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
