import React, { useState } from "react";
import Dock from "./Dock";
import InstallPrompt from "./InstallPrompt";


const DAILY_GOAL = 2000;

function WaterTracker({ water, setWater }) {
  const [customAmount, setCustomAmount] = useState("");
  const [defaultAmount, setDefaultAmount] = useState(250); // 🆕 esto se usa en home
  const [selected, setSelected] = useState("home"); // controla el dock

  const handleCustomSet = () => {
    const amount = parseInt(customAmount);
    if (!isNaN(amount) && amount > 0 && amount <= 2000) {
      setDefaultAmount(amount);
      alert(`Ahora el botón principal agregará +${amount}ml`);
    } else {
      alert("Ingresa un valor válido entre 1 y 2000 ml.");
    }
  };

  const percentage = Math.min((water / DAILY_GOAL) * 100, 100);

  return (
    <div style={styles.container}>
      <h1 style={styles.gradientText}>Drink water, stay hydrated!</h1>

      <div style={styles.glassWrapper}>
        <div style={styles.glassClip}>
          <div
            style={{
              ...styles.fill,
              height: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <p style={styles.text}>
        Has bebido <strong>{(water / 1000).toFixed(2)}</strong> L de 2 L
      </p>

      {/* HOME VIEW */}
      {selected === "home" && (
        <div style={styles.buttons}>
          <button
            style={water >= DAILY_GOAL ? { ...styles.button, ...styles.disabledButton } : styles.button}
            onClick={() =>
              setWater(w => {
                const nextAmount = w + defaultAmount;
                return nextAmount <= DAILY_GOAL ? nextAmount : w;
              })
            }
            disabled={water >= DAILY_GOAL}
          >
            + {defaultAmount} ml
          </button>

        </div>
      )}

      {/* CUSTOM VIEW */}
      {selected === "custom" && (
        <div style={styles.buttons}>
          <input
            type="number"
            min="1"
            max="2000"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            style={styles.input}
            placeholder="ml"
          />
          <button style={styles.button} onClick={handleCustomSet}>
            Personalizar Cantidad
          </button>
        </div>
      )}

      {/* INFO VIEW */}
      {selected === "info" && (
        <div style={styles.infoBox}>
          <p>
            La cantidad de agua recomendada
              diariamente puede variar según la edad, el 
              clima, el nivel de actividad y otros factores.
              Sin embargo, la recomendación general es 
              alrededor de 2 litros<br /> (8 vasos) al día para 
              un adulto promedio.
          </p>
        </div>
      )}
      <InstallPrompt />
      <Dock selected={selected} setSelected={setSelected} />
    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    paddingBottom: 60, // espacio para el dock
    background: "#131010",
  },
  glassWrapper: {
  position: "relative",
  width: 180,   // más ancho
  height: 220,  // más bajo
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 40,
},

glassClip: {
  position: "absolute",
  width: "100%",
  height: "100%",
  clipPath: `polygon(
    40% 0%,   
    60% 0%,
    60% 10%,  
    75% 20%, 
    75% 90%, 
    25% 90%, 
    25% 20%, 
    40% 10%
  )`,
  backgroundColor: "#e0f7ff",
  overflow: "hidden",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  zIndex: 1,
},


  fill: {
    width: "100%",
    backgroundColor: "#00bfff",
    position: "absolute",
    bottom: 0,
    transition: "height 0.5s ease-in-out",
    borderRadius: "0 0 8px 8px",
    marginBottom: 10,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  buttons: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  
  disabledButton: {
  backgroundColor: "#96C9F4",
  color: "#fff",
  cursor: "not-allowed",
},
  input: {
    padding: "10px 16px",
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
    textAlign: "center",
  },
  infoBox: {
    maxWidth: 600,
    textAlign: "center",
    padding: 10,
    background: "#f3f3f3",
    borderRadius: 8,
    color: "#000",
  },
  gradientText: {
    fontSize: 28,
    fontWeight: "bold",
    background: "linear-gradient(270deg, #4079ff, #40ffaa, #4079ff)",
    backgroundSize: "600% 600%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    animation: "gradientShift 6s ease infinite",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 30,
  },
};

export default WaterTracker;
