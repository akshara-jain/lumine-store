import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-8xl mb-4 text-primary">404</h1>
        <h2 className="font-serif text-3xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg font-light">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg" className="rounded-full px-8 uppercase tracking-widest text-sm">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
