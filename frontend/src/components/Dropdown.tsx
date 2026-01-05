import React, { useState, useRef, useEffect } from 'react'

export default function Dropdown({ button, children }: { button: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(v => !v)}>{button}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow z-20">{children}</div>
      )}
    </div>
  )
}
