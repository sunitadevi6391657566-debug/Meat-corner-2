"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const FEEDBACK_OPTIONS = [
  { id: 'fresh', label: 'Fresh 🥩' },
  { id: 'quality', label: 'High Quality ✨' },
  { id: 'trusted', label: 'Trusted ✅' },
  { id: 'hygienic', label: 'Hygienic 🧼' },
  { id: 'expensive', label: 'Expensive 💸' },
  { id: 'fast', label: 'Fast Delivery 🚚' },
]

export function FeedbackOverlay() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Quick Feedback</p>
      <div className="flex flex-wrap gap-2">
        {FEEDBACK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border",
              selected.includes(opt.id)
                ? "bg-primary text-white border-primary shadow-md scale-105"
                : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground/20"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
