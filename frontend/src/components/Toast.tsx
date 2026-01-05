import React, { createContext, useContext, useState, useCallback } from 'react'

type Toast = { id: string; message: string }

const ToastContext = createContext({
  push: (msg: string) => {}
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string) => {
    const t = { id: String(Date.now()), message }
    setToasts(s => [t, ...s])
    setTimeout(() => setToasts(s => s.filter(x => x.id !== t.id)), 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className="bg-black text-white px-4 py-2 rounded shadow">{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
