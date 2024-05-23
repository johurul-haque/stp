import { getUser } from '@/lib/api/get-user';

export default async function Page() {
  const user = await getUser();

  return (
    <main className="container">
      <pre>{JSON.stringify(user.data, null, 2)}</pre>
    </main>
  );
}
