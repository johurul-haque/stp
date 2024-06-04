import { HeroSection } from '@/components/layout/homepage/hero-section';

export default function HomePage() {
  return (
    <main className="container text-center flex flex-col min-h-full flex-1">
      <HeroSection />

      {Array.from({ length: 10 }).map((_, i) => (
        <section
          key={i}
          className="flex-1 min-h-full grid place-items-center content-center"
        >
          <h1>Find your travel companions</h1>
          <p className="max-w-sm mx-auto">
            Share your trip details and find people who are interested to join
            with your journey.
          </p>
        </section>
      ))}
    </main>
  );
}
