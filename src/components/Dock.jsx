import React from "react";
import { Home, Droplet, Info } from "lucide-react";

const Dock = ({ selected, setSelected }) => {
  return (
    <div style={styles.dock}>
      <button
        style={selected === "home" ? { ...styles.button, ...styles.active } : styles.button}
        onClick={() => setSelected("home")}
        title="Home"
      >
        <Home size={24} />
      </button>
      <button
        style={selected === "custom" ? { ...styles.button, ...styles.active } : styles.button}
        onClick={() => setSelected("custom")}
        title="Custom"
      >
        <Droplet size={24} />
      </button>
      <button
        style={selected === "info" ? { ...styles.button, ...styles.active } : styles.button}
        onClick={() => setSelected("info")}
        title="Info"
      >
        <Info size={24} />
      </button>
    </div>
  );
};


const styles = {
  dock: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#131010",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "10px 14px",
    border: "1px solid #cccccc",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
  button: {
    background: "transparent",
    border: "1px solid #cccccc",
    color: "#222222",
    fontSize: 22,
    padding: "10px",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease-in-out",
  },
  active: {
    background: "#131010",
    border: "2px solid #ffffff",
    color: "#ffffff",
  },
};


export default Dock;
