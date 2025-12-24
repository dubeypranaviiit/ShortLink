import React, { createContext, useContext, useState } from "react"
const ToastContext = createContext({ toast: () => {} })
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const toast = ({ title, description, variant }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, title, description, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md px-4 py-3 text-sm shadow-md ${
              t.variant === "destructive"
                ? "bg-red-600 text-white"
                : "bg-black text-white"
            }`}
          >
            {t.title && <p className="font-semibold">{t.title}</p>}
            {t.description && <p>{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
