import { useEffect, useState } from "react"

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true

    if (!isMobile || isInStandaloneMode) {
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
      console.log("📲 beforeinstallprompt capturado")
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      console.log("✅ Usuario aceptó la instalación")
      setVisible(false)
    } else {
      console.log("❌ Usuario rechazó la instalación")
    }
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <button
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: 76,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#00aaff",
        color: "#fff",
        fontSize: 24,
        border: "none",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
        cursor: "pointer",
      }}
      title="Instalar App"
    >
      ⬇️
    </button>
  )
}
