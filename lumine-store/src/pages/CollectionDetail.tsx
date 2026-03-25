import { useListProducts, useListCollections } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export default function CollectionDetail({ params }: { params: { id: string } }) {
  const collectionId = parseInt(params.id);
  
  const { data: collections } = useListCollections();
  const collection = collections?.find(c => c.id === collectionId);
  
  const { data: products, isLoading } = useListProducts({ collectionId });

  return (
    <div className="min-h-screen">
      {/* Collection Hero */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={collection?.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1600&q=80"} 
            alt={collection?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-3xl px-4 mt-16">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">
              {collection?.name || "Loading..."}
            </h1>
            <p className="text-lg text-white/90 font-light max-w-xl mx-auto">
              {collection?.description || "Curated products tailored for your specific needs."}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-24 container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-secondary aspect-[3/4] rounded-2xl" />
                <div className="h-4 bg-secondary w-2/3 rounded" />
                <div className="h-4 bg-secondary w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.1} direction="up">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-serif text-2xl mb-4 text-foreground">No products in this collection</h3>
            <Button onClick={() => window.history.back()} variant="outline" className="rounded-full">
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
