import { redirect } from 'next/navigation';

type PropsType = {
  params: { tripId: string };
};

export default async function Page({ params }: PropsType) {
  return redirect('/trips/' + params.tripId);
}
