import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border/50">
          
          {/* Contact Info */}
          <div className="flex-1 bg-primary text-primary-foreground p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            
            <FadeIn>
              <h2 className="font-serif text-4xl mb-6">Get in Touch</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-12 font-light text-lg">
                Have questions about our products, your order, or need personalized skincare advice? Our concierge team is here to help.
              </p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-2">Email</h4>
                  <p className="text-lg font-medium">concierge@luminestore.com</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-2">Phone</h4>
                  <p className="text-lg font-medium">1-800-LUMINE-8</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">Mon-Fri, 9am-6pm EST</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60 mb-2">Press Inquiries</h4>
                  <p className="text-lg font-medium">press@luminestore.com</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="flex-[1.5] p-12 lg:p-16">
            <FadeIn delay={0.2}>
              <h3 className="font-serif text-2xl mb-8">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">First Name</label>
                    <Input required className="rounded-none border-t-0 border-x-0 border-b-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Last Name</label>
                    <Input required className="rounded-none border-t-0 border-x-0 border-b-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-lg" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input type="email" required className="rounded-none border-t-0 border-x-0 border-b-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 pb-2 text-lg" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Message</label>
                  <Textarea required className="min-h-[120px] rounded-none border-t-0 border-x-0 border-b-2 bg-transparent focus-visible:ring-0 focus-visible:border-primary px-0 text-lg resize-none" />
                </div>
                
                <Button type="submit" size="lg" className="w-full rounded-full uppercase tracking-widest py-6 mt-4 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                  Send Message
                </Button>
              </form>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
}
