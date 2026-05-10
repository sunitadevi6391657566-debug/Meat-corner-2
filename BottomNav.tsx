"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ClipboardList, User, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Feed", href: "/" },
  { icon: Search, label: "Nearby", href: "/search" },
  { icon: PlusCircle, label: "Live", href: "/live", highlight: true },
  { icon: ClipboardList, label: "Orders", href: "/orders" },
  { icon: User, label: "Me", href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-xl border-t border-border flex items-end justify-around h-24 px-4 z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center h-16 transition-all duration-300 active:scale-90",
              item.highlight ? "relative -top-4" : ""
            )}
          >
            <div className={cn(
              "flex flex-col items-center justify-center gap-1",
              isActive && !item.highlight ? "text-primary" : "text-muted-foreground",
              item.highlight ? "bg-primary text-white p-4 rounded-full shadow-[0_5px_20px_rgba(var(--primary),0.3)] border-4 border-background" : ""
            )}>
              <Icon className={cn(item.highlight ? "w-7 h-7" : "w-6 h-6", isActive && !item.highlight && "stroke-[3px]")} />
              {!item.highlight && (
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-tighter",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  {item.label}
                </span>
              )}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
