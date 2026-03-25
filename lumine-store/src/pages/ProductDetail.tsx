import { useState } from "react";
import { useGetProduct } from "@workspace/api-client-react";
import { useCartMutations } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Minus, Plus, ShoppingBag, Star, Shield, Leaf, Droplet } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { data: product, isLoading, isError } = useGetProduct(id);
  const { addToCart, isAdding } = useCartMutations();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 container mx-auto px-4 flex flex-col md:flex-row gap-12">
        <div className="flex-1 aspect-[4/5] bg-secondary animate-pulse rounded-3xl" />
        <div className="flex-1 space-y-6 pt-10">
          <div className="h-10 bg-secondary w-3/4 rounded animate-pulse" />
          <div className="h-6 bg-secondary w-1/4 rounded animate-pulse" />
          <div className="h-32 bg-secondary w-full rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&q=80"];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <FadeIn direction="right" className="flex-1 lg:max-w-2xl">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 md:w-24 shrink-0">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 w-20 md:w-full aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                <img 
                  src={images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn direction="left" className="flex-1 flex flex-col pt-4 lg:pt-10">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                {product.collectionName || 'Skincare'}
              </span>
              {product.badge && (
                <span className="text-[10px] font-bold tracking-wider uppercase bg-secondary px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">${product.comparePrice.toFixed(2)}</span>
              )}
              <div className="flex items-center gap-1 ml-auto text-sm text-muted-foreground">
                <div className="flex items-center text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent'}`} />
                  ))}
                </div>
                <span>({product.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
              {product.description}
            </p>

            <Separator className="mb-8" />

            {/* Add to Cart form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-border rounded-full p-1 w-full sm:w-32 bg-background">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.inventory || 10, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button 
                onClick={() => addToCart(product.id, quantity)}
                disabled={isAdding || product.inventory === 0}
                size="lg" 
                className="flex-1 rounded-full uppercase tracking-widest text-sm py-7 shadow-xl shadow-primary/20"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.inventory === 0 ? "Out of Stock" : "Add to Bag"}
              </Button>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-10 text-center">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider">Clinically<br/>Proven</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50">
                <Leaf className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider">100%<br/>Vegan</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50">
                <Droplet className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider">Clean<br/>Formula</span>
              </div>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="text-sm font-medium uppercase tracking-wider py-5 hover:no-underline hover:text-primary">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Formulated with our proprietary blend of active ingredients, this luxurious formula absorbs quickly to deliver immediate hydration and long-term benefits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients" className="border-border">
                <AccordionTrigger className="text-sm font-medium uppercase tracking-wider py-5 hover:no-underline hover:text-primary">
                  Key Ingredients
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Hyaluronic Acid:</strong> Draws moisture into the skin for a plump, hydrated look.</li>
                    <li><strong>Niacinamide:</strong> Strengthens the skin barrier and evens skin tone.</li>
                    <li><strong>Botanical Extracts:</strong> Provides antioxidant protection against environmental stressors.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage" className="border-border">
                <AccordionTrigger className="text-sm font-medium uppercase tracking-wider py-5 hover:no-underline hover:text-primary">
                  How To Use
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Apply 2-3 drops to clean, dry skin morning and night. Massage gently until fully absorbed. Follow with moisturizer and SPF during the day.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
