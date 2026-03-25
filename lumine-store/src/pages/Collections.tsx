import { useListCollections } from "@workspace/api-client-react";
import { CollectionCard } from "@/components/product/CollectionCard";
import { FadeIn } from "@/components/ui/fade-in";

export default function Collections() {
  const { data: collections, isLoading } = useListCollections();

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Curated Edit
            </span>
            <h1 className="font-serif text-5xl mb-6">Our Collections</h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Explore our thoughtfully curated routines, designed to address specific concerns and elevate your daily skincare ritual.
            </p>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-secondary rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : collections?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, i) => (
              <FadeIn key={collection.id} delay={i * 0.1} direction="up">
                <CollectionCard collection={collection} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No collections available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
