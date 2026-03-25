import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/lib/cart-context";
import { useCart, useCartMutations } from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, closeCart } = useCartContext();
  const { data: cart, isLoading } = useCart();
  const { updateQuantity, removeItem, isUpdating, isRemoving } = useCartMutations();

  const isBusy = isUpdating || isRemoving;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l-border">
        <SheetHeader className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-2xl font-normal">Your Bag</SheetTitle>
            <span className="text-sm text-muted-foreground">
              {cart?.itemCount || 0} {cart?.itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 p-6 flex flex-col gap-6">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-24 h-32 bg-muted rounded-md" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 bg-muted w-3/4 rounded" />
                  <div className="h-4 bg-muted w-1/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : !cart?.items?.length ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl mb-2">Your bag is empty</h3>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything yet.
            </p>
            <Button onClick={closeCart} asChild className="rounded-full px-8 py-6 uppercase tracking-wider text-sm">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="flex flex-col gap-8">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <Link href={`/product/${item.productId}`} onClick={closeCart} className="shrink-0 cursor-pointer">
                      <div className="w-24 h-32 bg-secondary rounded-lg overflow-hidden">
                        <img 
                          src={item.productImage || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"} 
                          alt={item.productName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/product/${item.productId}`} onClick={closeCart}>
                          <h4 className="font-medium hover:text-primary transition-colors line-clamp-2">
                            {item.productName}
                          </h4>
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          disabled={isBusy}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm font-medium mb-auto">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-full overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1 || isBusy}
                            className="p-2 hover:bg-secondary disabled:opacity-50 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isBusy}
                            className="p-2 hover:bg-secondary disabled:opacity-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm font-medium">
                          ${item.lineTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 bg-background border-t border-border/50">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between mb-6">
                <span className="font-medium text-lg">Total</span>
                <span className="font-serif text-xl">${cart.total.toFixed(2)}</span>
              </div>
              
              <Button className="w-full rounded-full py-6 text-sm uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-xl transition-all">
                Checkout
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                Shipping & taxes calculated at checkout.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
