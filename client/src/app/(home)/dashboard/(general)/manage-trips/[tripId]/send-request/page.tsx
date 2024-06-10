import { getUser } from '@/lib/api/get-user';
import { SendRequestForm } from './_form';

type PageProps = {
  params: { tripId: string };
};

export default async function Page({ params }: PageProps) {
  const user = await getUser();

  return (
    <main className="mt-6">
      <SendRequestForm tripId={params.tripId} user={user!.data} />
    </main>
  );
}
