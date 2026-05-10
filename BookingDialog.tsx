"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Minus, Plus, ShoppingBag, Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stream: {
    sellerName: string
    type: string
    price: number
  }
}

export function BookingDialog({ open, onOpenChange, stream }: BookingDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const [delivery, setDelivery] = useState("pickup")
  const { toast } = useToast()

  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your order for ${quantity}kg ${stream.type} has been placed.`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-t-3xl sm:rounded-3xl border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase text-primary">Book Fresh Meat</DialogTitle>
          <p className="text-sm text-muted-foreground">{stream.sellerName} • {stream.type}</p>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label className="text-lg font-bold">Select Quantity (KG)</Label>
            <div className="flex items-center justify-center gap-6 bg-secondary/50 p-4 rounded-2xl">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full border-primary/20"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-6 w-6" />
              </Button>
              <span className="text-4xl font-black w-16 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full border-primary/20"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-bold">Service Mode</Label>
            <RadioGroup value={delivery} onValueChange={setDelivery} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                <Label
                  htmlFor="pickup"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <ShoppingBag className="mb-3 h-6 w-6" />
                  <span className="font-bold">Self Pickup</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                <Label
                  htmlFor="delivery"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Truck className="mb-3 h-6 w-6" />
                  <span className="font-bold">Home Delivery</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-muted-foreground">Rate: ₹{stream.price}/kg</span>
              <span className="text-sm font-medium text-muted-foreground">Total Weight: {quantity}kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total Payable</span>
              <span className="text-2xl font-black text-primary">₹{stream.price * quantity}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button 
            onClick={handleBooking}
            className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}