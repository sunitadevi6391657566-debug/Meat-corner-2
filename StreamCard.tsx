"use client"

import Image from "next/image"
import { Heart, MessageCircle, Share2, ShoppingCart, Star, MapPin, Bookmark, ThumbsDown, MoreVertical, Eye, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { BookingDialog } from "./BookingDialog"
import { FeedbackOverlay } from "./FeedbackOverlay"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface StreamCardProps {
  stream: {
    id: string
    sellerName: string
    type: string
    price: number
    quantity: string
    distance: string
    rating: number
    viewers: string
    videoUrl: string
    cuttingTime: string
    sellerAvatar: string
    description?: string
  }
}

export function StreamCard({ stream }: StreamCardProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const renderContent = (fullScreen: boolean) => (
    <div className={cn(
      "flex flex-col border-b border-border transition-colors",
      fullScreen ? "h-full bg-background" : "bg-card shadow-sm mx-0 sm:mx-4 sm:rounded-2xl sm:overflow-hidden sm:mb-6"
    )}>
      {/* Video Thumbnail Area */}
      <div 
        className={cn(
          "relative cursor-pointer group",
          fullScreen ? "w-full aspect-video" : "w-full aspect-video"
        )}
        onClick={() => !fullScreen && setIsFullScreen(true)}
      >
        <Image
          src={stream.videoUrl}
          alt={stream.type}
          fill
          className="object-cover"
          priority
          data-ai-hint="meat cuts"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all flex items-center justify-center">
          {!fullScreen && (
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
              <Play className="w-6 h-6 fill-white text-white ml-1" />
            </div>
          )}
        </div>
        
        {/* Live Badges Overlay on Thumbnail */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-orange-500 text-white px-2 h-5 text-[10px] font-black rounded-sm border-none animate-pulse">
            LIVE
          </Badge>
          <Badge className="bg-sky-500 text-white px-2 h-5 text-[10px] border-none">
            <Eye className="w-3 h-3 mr-1" /> {stream.viewers}
          </Badge>
        </div>

        {fullScreen && (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
            className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Info Section - BELOW the video */}
      <div className={cn(
        "p-4 space-y-4",
        fullScreen ? "flex-1 overflow-y-auto bg-background" : ""
      )}>
        <div className="flex gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border shrink-0">
            <Image src={stream.sellerAvatar} alt={stream.sellerName} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black uppercase tracking-tight truncate leading-tight">
              {stream.type}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-muted-foreground">@{stream.sellerName.replace(/\s/g, '').toLowerCase()}</span>
              <span className="text-[10px] text-muted-foreground">•</span>
              <span className="flex items-center gap-0.5 text-xs text-yellow-600 font-bold">
                <Star className="w-3 h-3 fill-current" /> {stream.rating}
              </span>
            </div>
          </div>
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Pricing and Location Bar */}
        <div className="flex items-center justify-between py-2 border-y border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-primary">₹{stream.price}</span>
            <span className="text-xs font-bold text-muted-foreground">/ KG</span>
          </div>
          <div className="flex gap-3 text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {stream.distance}</span>
            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">STOCK: {stream.quantity}</span>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
          {stream.description}
        </p>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-2">
            <div className="flex items-center bg-secondary rounded-full overflow-hidden">
              <button 
                onClick={() => { setLiked(!liked); setDisliked(false); }}
                className={cn("px-4 py-2 flex items-center gap-2 transition-all", liked ? "text-primary bg-primary/10" : "text-foreground")}
              >
                <Heart className={cn("w-5 h-5", liked && "fill-current")} />
                <span className="text-xs font-bold">1.2K</span>
              </button>
              <div className="w-[1px] h-4 bg-border" />
              <button 
                onClick={() => { setDisliked(!disliked); setLiked(false); }}
                className={cn("px-4 py-2 flex items-center gap-2 transition-all", disliked ? "text-primary bg-primary/10" : "text-foreground")}
              >
                <ThumbsDown className={cn("w-5 h-5", disliked && "fill-current")} />
              </button>
            </div>
            
            <button className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-foreground">
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-bold">Share</span>
            </button>
          </div>

          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn("p-2 rounded-full", isBookmarked ? "text-yellow-600" : "text-muted-foreground")}
          >
            <Bookmark className={cn("w-6 h-6", isBookmarked && "fill-current")} />
          </button>
        </div>

        <FeedbackOverlay />

        <Button 
          onClick={() => setShowBooking(true)}
          className="w-full h-14 text-lg font-black uppercase bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg transition-all active:scale-[0.98] mt-4"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Book Fresh Cut Now
        </Button>
      </div>

      <BookingDialog 
        open={showBooking} 
        onOpenChange={setShowBooking} 
        stream={stream} 
      />
    </div>
  )

  return (
    <>
      {renderContent(false)}

      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="full-screen-overlay"
          >
            {renderContent(true)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
