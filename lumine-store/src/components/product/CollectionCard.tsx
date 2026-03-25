import { Link } from "wouter";
import { Collection } from "@workspace/api-client-react";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  collection: Collection;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function CollectionCard({ collection, aspectRatio = "portrait" }: CollectionCardProps) {
  const ratioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]"
  };

  return (
    <Link href={`/collections/${collection.id}`} className="group block cursor-pointer">
      <div className={`relative rounded-2xl overflow-hidden bg-secondary ${ratioClasses[aspectRatio]}`}>
        <img
          src={collection.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
        
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-serif text-2xl sm:text-3xl mb-2">{collection.name}</h3>
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="text-sm text-white/80 font-medium tracking-wide uppercase">
              Explore Collection
            </span>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
