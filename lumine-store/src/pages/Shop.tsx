import { useState } from "react";
import { useListProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [filter, setFilter] = useState<"all" | "bestseller" | "new">("all");
  
  const { data: products, isLoading } = useListProducts({});

  const filteredProducts = products?.filter(p => {
    if (filter === "bestseller") return p.bestSeller;
    if (filter === "new") return p.badge?.toLowerCase() === "new";
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <h1 className="font-serif text-5xl mb-4">Shop All</h1>
            <p className="text-muted-foreground text-lg">
              Discover our complete collection of high-performance skincare essentials.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["all", "bestseller", "new"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f as any)}
              className="rounded-full text-xs uppercase tracking-wider px-6"
            >
              {f === "all" ? "All Products" : f === "bestseller" ? "Best Sellers" : "New Arrivals"}
            </Button>
          ))}
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-secondary aspect-[3/4] rounded-2xl" />
                <div className="h-4 bg-secondary w-2/3 rounded" />
                <div className="h-4 bg-secondary w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProducts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.05} direction="up">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-muted-foreground">
            <h3 className="font-serif text-2xl mb-2 text-foreground">No products found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
