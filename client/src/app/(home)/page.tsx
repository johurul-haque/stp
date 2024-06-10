import { FAQ } from '@/components/layout/homepage/faq';
import { HeroSection } from '@/components/layout/homepage/hero-section';
import { MostPopular } from '@/components/layout/homepage/most-popular';
import { RecentPosts } from '@/components/layout/homepage/recent-posts';

type PageProps = {
  searchParams?: {
    query?: string;
  };
};

export default async function HomePage({ searchParams }: PageProps) {
  return (
    <main className="container flex flex-col">
      <HeroSection />
      <RecentPosts query={searchParams?.query} />
      <MostPopular />
      <FAQ />
    </main>
  );
}
