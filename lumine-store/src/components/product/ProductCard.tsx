import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartMutations } from "@/hooks/use-cart";
import { ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAdding } = useCartMutations();

  return (
    <div className="group flex flex-col h-full hover-elevate bg-card rounded-2xl p-3 border border-border/40">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary mb-4">
        {product.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-white/90 text-foreground hover:bg-white backdrop-blur-sm border-none shadow-sm font-medium tracking-wider uppercase text-[10px]">
            {product.badge}
          </Badge>
        )}
        
        <Link href={`/product/${product.id}`} className="absolute inset-0 cursor-pointer">
          <img
            src={product.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
        
        <div className="absolute bottom-3 left-3 right-3 translate-y-[120%] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, 1);
            }}
            disabled={isAdding}
            className="w-full rounded-full bg-white/95 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-sm shadow-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            {product.collectionName || 'Skincare'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`}>
          <h3 className="font-serif text-lg leading-tight mb-2 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 mt-auto">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center gap-3 mt-auto">
          <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
              ${product.comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
