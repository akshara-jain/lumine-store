import { Link } from "wouter";
import { ArrowRight, Leaf, ShieldCheck, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductCard } from "@/components/product/ProductCard";
import { useListProducts, useSubscribeNewsletter } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { data: featuredProducts, isLoading: loadingProducts } = useListProducts({ featured: true, limit: 4 });
  const subscribeMutation = useSubscribeNewsletter();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get('email') as string;
    
    if (email) {
      subscribeMutation.mutate({ data: { email } }, {
        onSuccess: (res) => {
          toast({ title: "Subscribed!", description: res.message });
          (e.target as HTMLFormElement).reset();
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Lumine Skincare Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4 mt-20">
          <FadeIn delay={0.2} direction="up">
            <span className="inline-block text-sm font-medium tracking-[0.2em] uppercase mb-6 text-white/90">
              The Art of Illumination
            </span>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
              Radiant Skin<br />Starts Here.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6} direction="up">
            <p className="text-lg md:text-xl font-light text-white/90 mb-10 max-w-xl mx-auto">
              Discover our clinically-proven, consciously-crafted formulas designed to elevate your daily ritual.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.8} direction="up">
            <Button asChild size="lg" className="rounded-full px-10 py-7 text-sm uppercase tracking-widest bg-white text-foreground hover:bg-white/90 transition-all hover:scale-105">
              <Link href="/shop">Shop The Collection</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary/40 py-8 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
              { icon: ShieldCheck, title: "Dermatologist Tested", subtitle: "Clinically proven" },
              { icon: Leaf, title: "Clean Ingredients", subtitle: "100% vegan & cruelty-free" },
              { icon: RefreshCw, title: "30-Day Returns", subtitle: "Money-back guarantee" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="flex flex-col items-center">
                <item.icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Curated Routines</h2>
              <p className="text-muted-foreground">Targeted solutions designed to work in harmony for optimal results.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <FadeIn delay={0.1} className="md:col-span-2">
              <Link href="/collections" className="group relative block rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-full bg-secondary">
                <img src={`${import.meta.env.BASE_URL}images/collection-face.png`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Face Care" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-3xl md:text-4xl mb-3">Face Care</h3>
                  <div className="flex items-center gap-2 text-sm uppercase tracking-widest font-medium">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-col gap-6 lg:gap-8">
              <Link href="/collections" className="group relative block rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] bg-secondary flex-1">
                <img src={`${import.meta.env.BASE_URL}images/collection-body.png`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Body Care" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-2xl mb-2">Body Care</h3>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
              <Link href="/collections" className="group relative block rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] bg-secondary flex-1">
                <img src={`${import.meta.env.BASE_URL}images/collection-sets.png`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Gift Sets" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="font-serif text-2xl mb-2">Gift Sets</h3>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <FadeIn>
              <h2 className="font-serif text-4xl mb-2">Cult Favorites</h2>
              <p className="text-muted-foreground">The products our community can't live without.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden md:block">
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/shop">View All Products</Link>
              </Button>
            </FadeIn>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-secondary aspect-[3/4] rounded-2xl" />
                  <div className="h-4 bg-secondary w-2/3 rounded" />
                  <div className="h-4 bg-secondary w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : featuredProducts?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <FadeIn key={product.id} delay={i * 0.1} direction="up">
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No featured products available at the moment.
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild className="rounded-full w-full">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <FadeIn direction="right" className="flex-1 w-full relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}images/about-image.png`} 
                  alt="Lumine Skincare Philosophy" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </FadeIn>
            
            <FadeIn direction="left" className="flex-1 space-y-8">
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary">
                Our Philosophy
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Beauty rooted in science, elevated by nature.
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                We believe that premium skincare should be both remarkably effective and a joy to use. Our formulations combine clinically-proven actives with potent botanical extracts to deliver transformative results without compromising on the sensory experience.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="rounded-full px-8 uppercase tracking-widest text-xs">
                  <Link href="/about">Discover Our Story</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white rounded-full mix-blend-overlay filter blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-black rounded-full mix-blend-overlay filter blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Join The Inner Circle</h2>
            <p className="text-lg text-primary-foreground/90 mb-10 font-light">
              Subscribe to receive 15% off your first order, plus exclusive access to new launches and expert skincare advice.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                name="email"
                required
                placeholder="Your email address" 
                className="flex-1 bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <Button type="submit" variant="secondary" className="rounded-full px-8 py-6 uppercase tracking-wider text-xs whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
