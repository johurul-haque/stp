import { getPopularTrips } from '@/lib/api/get-popular-trips';
import { TripsCards } from '.';

export async function PopularTrips() {
  const { data } = await getPopularTrips();

  return <TripsCards data={data} />;
}
