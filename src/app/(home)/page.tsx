import { HeroSection } from '@/components/layout/homepage/hero-section';
import { RecentPosts } from '@/components/layout/homepage/recent-posts';

type PageProps = {
  searchParams?: {
    query?: string;
  };
};

export default async function HomePage({ searchParams }: PageProps) {
  return (
    <main className="container flex flex-col min-h-full flex-1">
      <HeroSection />
      <RecentPosts query={searchParams?.query} />

      {/* {Array.from({ length: 10 }).map((_, i) => (
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
      ))} */}
    </main>
  );
}
