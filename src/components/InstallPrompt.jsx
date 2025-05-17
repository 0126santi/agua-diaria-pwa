// components/InstallPrompt.jsx
import React, { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
    }
  };

  // Solo mostrar en móvil
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!showPrompt || !isMobile) return null;

  return (
    <button style={styles.promptButton} onClick={handleInstall}>
      Instalar app
    </button>
  );
}

const styles = {
  promptButton: {
    position: "fixed",
    bottom: 80,
    right: 20,
    padding: "10px 16px",
    backgroundColor: "#ffffffcc",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontSize: 14,
    zIndex: 1000,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    color: "#000",
  },
};
