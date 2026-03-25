import { FadeIn } from "@/components/ui/fade-in";

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <FadeIn>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
              Redefining luxury through conscious formulation.
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Lumine was born from a simple belief: that you shouldn't have to choose between effective results, clean ingredients, and a luxurious experience.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-24">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-image.png`} 
            alt="Lumine Brand Image" 
            className="w-full h-full object-cover"
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
          <FadeIn direction="right">
            <h2 className="font-serif text-3xl mb-6">The Art of Science</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
              We approach skincare as both a science and an art. Every formula in our collection is rigorously tested and clinically proven, yet crafted to provide a sensory experience that elevates your daily routine into a moment of pure indulgence.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light">
              Our chemists work in harmony with nature, isolating the most potent active compounds from botanical sources and stabilizing them for maximum efficacy.
            </p>
          </FadeIn>
          
          <FadeIn direction="left">
            <h2 className="font-serif text-3xl mb-6">Radical Transparency</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
              We believe you have the right to know exactly what goes onto your skin. We exclude over 2,500 questionable ingredients from our formulations, adhering to the strictest clean beauty standards globally.
            </p>
            <p className="text-muted-foreground leading-relaxed font-light">
              From sustainable sourcing and ethical labor practices to 100% recyclable packaging, our commitment to the planet is as strong as our commitment to your skin's health.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
