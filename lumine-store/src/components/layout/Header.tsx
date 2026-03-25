import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartContext } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { data: cart } = useCart();
  const { openCart } = useCartContext();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
    isScrolled || !isHome
      ? "bg-background/90 backdrop-blur-md border-border/50 py-4"
      : "bg-transparent border-transparent py-6",
    !isScrolled && isHome ? "text-white" : "text-foreground"
  );

  return (
    <>
      <div className="bg-foreground text-background text-xs font-medium tracking-widest text-center py-2 px-4 uppercase">
        Free shipping on orders over $50 | Use code: LUMINE20
      </div>
      
      <header className={headerClasses}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Mobile Menu & Search */}
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden p-2 -ml-2">
              <Menu className="w-5 h-5" />
            </button>
            <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 text-center">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl md:text-4xl tracking-tight leading-none font-medium">
                LUMINE
              </span>
            </Link>
          </div>

          {/* Navigation & Cart */}
          <div className="flex items-center justify-end gap-6 flex-1">
            <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
              <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
              <Link href="/collections" className="hover:opacity-70 transition-opacity">Collections</Link>
              <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:opacity-70 transition-opacity">
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={openCart}
                className="relative p-2 -mr-2 hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden md:block text-sm font-medium">Cart</span>
                {cart?.itemCount ? (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
