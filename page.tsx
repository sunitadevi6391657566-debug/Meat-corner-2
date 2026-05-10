"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { BottomNav } from "@/components/BottomNav"
import { TopFilters } from "@/components/TopFilters"
import { StreamCard } from "@/components/StreamCard"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_STREAMS = [
  {
    id: "1",
    sellerName: "Al-Barakah Meat Shop",
    type: "Khasi Bakra (Tender)",
    category: "bakra",
    subCategory: "khasi",
    price: 850,
    quantity: "15 KG Left",
    distanceValue: 1.2,
    distance: "1.2 KM Away",
    rating: 4.9,
    viewers: "1.2K",
    videoUrl: "https://picsum.photos/seed/bakra1/1080/720",
    cuttingTime: "Live Now",
    sellerAvatar: "https://picsum.photos/seed/seller1/100/100",
    description: "Premium grass-fed Khasi Bakra. Fresh cut available right now. Hygienically processed and ready for your kitchen."
  },
  {
    id: "2",
    sellerName: "Standard Chicken Center",
    type: "Broiler Chicken (Full)",
    category: "murga",
    subCategory: "broiler",
    price: 240,
    quantity: "40 KG Left",
    distanceValue: 0.8,
    distance: "0.8 KM Away",
    rating: 4.7,
    viewers: "850",
    videoUrl: "https://picsum.photos/seed/meat2/1080/720",
    cuttingTime: "Next Cut: 10 mins",
    sellerAvatar: "https://picsum.photos/seed/seller2/100/100",
    description: "Farm fresh broiler chicken. Quick processing. Order now for home delivery within 30 mins."
  },
  {
    id: "3",
    sellerName: "Village Desi Murga",
    type: "Kadaknath Black Chicken",
    category: "murga",
    subCategory: "kadaknath",
    price: 950,
    quantity: "5 Birds Available",
    distanceValue: 4.5,
    distance: "4.5 KM Away",
    rating: 4.9,
    viewers: "310",
    videoUrl: "https://picsum.photos/seed/murga1/1080/720",
    cuttingTime: "On Order",
    sellerAvatar: "https://picsum.photos/seed/seller5/100/100",
    description: "Authentic Kadaknath chicken known for its medicinal properties and rich taste."
  },
  {
    id: "4",
    sellerName: "Fresh Catch Fisheries",
    type: "Rohu (Nadi ki Machli)",
    category: "fish",
    subCategory: "rohu",
    price: 280,
    quantity: "12 KG Available",
    distanceValue: 2.5,
    distance: "2.5 KM Away",
    rating: 4.8,
    viewers: "420",
    videoUrl: "https://picsum.photos/seed/fish1/1080/720",
    cuttingTime: "Fresh Arrival",
    sellerAvatar: "https://picsum.photos/seed/seller3/100/100",
    description: "Large Rohu fish from the river. Best for traditional curry and frying."
  },
  {
    id: "5",
    sellerName: "River Side Fish Mart",
    type: "Surmai (King Fish)",
    category: "fish",
    subCategory: "surmai",
    price: 720,
    quantity: "25 KG Available",
    distanceValue: 1.5,
    distance: "1.5 KM Away",
    rating: 4.6,
    viewers: "580",
    videoUrl: "https://picsum.photos/seed/fish2/1080/720",
    cuttingTime: "Live Cutting",
    sellerAvatar: "https://picsum.photos/seed/seller6/100/100",
    description: "Ocean fresh Surmai steaks. Cleaned and hygienically packed."
  },
  {
    id: "6",
    sellerName: "Blue Ocean Seafood",
    type: "Tiger Prawns (Jhinga)",
    category: "seafood",
    subCategory: "prawn",
    price: 1100,
    quantity: "8 KG Available",
    distanceValue: 5.2,
    distance: "5.2 KM Away",
    rating: 4.9,
    viewers: "240",
    videoUrl: "https://picsum.photos/seed/seafood1/1080/720",
    cuttingTime: "Iced Fresh",
    sellerAvatar: "https://picsum.photos/seed/seller7/100/100",
    description: "Extra large Tiger Prawns. Perfectly de-veined on request."
  },
  {
    id: "7",
    sellerName: "City Meat Point",
    type: "Desi Murga (Gaon ka)",
    category: "murga",
    subCategory: "desi-murga",
    price: 550,
    quantity: "15 KG Left",
    distanceValue: 2.1,
    distance: "2.1 KM Away",
    rating: 4.8,
    viewers: "1.1K",
    videoUrl: "https://picsum.photos/seed/murga2/1080/720",
    cuttingTime: "Live Processing",
    sellerAvatar: "https://picsum.photos/seed/seller8/100/100",
    description: "Organic country chicken raised in village farms. No chemicals used."
  },
  {
    id: "8",
    sellerName: "Hillside Mutton Farm",
    type: "Sirohi Bakra",
    category: "bakra",
    subCategory: "sirohi",
    price: 880,
    quantity: "10 KG Available",
    distanceValue: 3.8,
    distance: "3.8 KM Away",
    rating: 4.7,
    viewers: "450",
    videoUrl: "https://picsum.photos/seed/bakra2/1080/720",
    cuttingTime: "Fresh Today",
    sellerAvatar: "https://picsum.photos/seed/seller9/100/100",
    description: "Authentic Sirohi breed goat meat. Known for its distinct flavor."
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredStreams = useMemo(() => {
    let result = [...MOCK_STREAMS]

    if (selectedFilter === "live") {
      return result
    }

    if (["bakra", "fish", "murga", "seafood"].includes(selectedFilter)) {
      result = result.filter(s => s.category === selectedFilter)
    } else if (["khasi", "rohu", "desi-murga", "kadaknath", "surmai", "prawn"].includes(selectedFilter)) {
      result = result.filter(s => s.subCategory === selectedFilter)
    } else if (selectedFilter === "nearby") {
      result = result.sort((a, b) => a.distanceValue - b.distanceValue)
    } else if (selectedFilter === "cheapest") {
      result = result.sort((a, b) => a.price - b.price)
    } else if (selectedFilter === "rated") {
      result = result.sort((a, b) => b.rating - a.rating)
    } else if (selectedFilter === "fresh-cut") {
      result = result.filter(s => s.cuttingTime.toLowerCase().includes("live") || s.cuttingTime.toLowerCase().includes("now"))
    }

    return result
  }, [selectedFilter])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [selectedFilter])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <TopFilters selected={selectedFilter} onSelect={setSelectedFilter} />

      <div 
        ref={containerRef}
        className="video-feed-container"
      >
        <AnimatePresence mode="popLayout">
          {filteredStreams.length > 0 ? (
            filteredStreams.map((stream) => (
              <motion.div 
                key={`${selectedFilter}-${stream.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="video-feed-item"
              >
                <StreamCard 
                  stream={stream} 
                />
              </motion.div>
            ))
          ) : (
            <div className="h-[60vh] w-screen flex flex-col items-center justify-center text-muted-foreground">
              <p className="text-xl font-black uppercase tracking-widest">No {selectedFilter} Found</p>
              <p className="text-sm mt-2">Try a different variety</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}
