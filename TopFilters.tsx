"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Search, Mic, SlidersHorizontal } from "lucide-react"

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "bakra", label: "Bakra" },
  { id: "khasi", label: "Khasi" },
  { id: "fish", label: "Fish" },
  { id: "rohu", label: "Rohu" },
  { id: "murga", label: "Murga" },
  { id: "desi-murga", label: "Desi" },
  { id: "kadaknath", label: "Kadaknath" },
  { id: "fresh-cut", label: "Fresh Cut" },
  { id: "nearby", label: "Nearby" },
  { id: "cheapest", label: "Cheapest" },
  { id: "rated", label: "Highest Rated" },
]

interface TopFiltersProps {
  selected: string
  onSelect: (id: string) => void
}

export function TopFilters({ selected, onSelect }: TopFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="fixed top-0 left-0 w-full z-50 pt-safe px-4 pb-4 bg-background/80 backdrop-blur-xl border-b border-border">
      {/* Search Bar Section */}
      <div className="flex items-center gap-3 mt-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search fresh cuts, rohu, desi murga..." 
            className="w-full h-12 bg-secondary/50 border border-transparent rounded-full pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary/50 focus:bg-background transition-all text-foreground placeholder:text-muted-foreground shadow-sm"
          />
        </div>
        <button className="h-12 w-12 bg-secondary/50 border border-transparent rounded-full flex items-center justify-center text-foreground/80 hover:text-primary transition-colors shadow-sm active:scale-90">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Pill Filters Section (YouTube Style) */}
      <div className="mt-4 flex items-center gap-2">
        <button className="shrink-0 h-9 w-9 bg-secondary rounded-lg flex items-center justify-center border border-border">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
        <div 
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "px-5 h-9 rounded-full whitespace-nowrap text-xs font-black uppercase tracking-tighter transition-all border",
                selected === cat.id 
                  ? "bg-foreground text-background border-foreground shadow-md scale-105" 
                  : "bg-secondary text-foreground border-border hover:bg-muted"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
