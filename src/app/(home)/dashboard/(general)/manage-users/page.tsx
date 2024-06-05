import gradient from '@/assets/gradient.svg';
import { Separator } from '@/components/ui/separator';
import { getAllUsers } from '@/lib/api/get-all-users';
import Image from 'next/image';
import { ToggleUserInfo } from './_components/toggle-info';

export default async function Page() {
  const { data } = await getAllUsers();

  console.log(data);

  return (
    <main>
      <div className="my-6">
        <h1 className="text-lg font-medium mb-0.5">Manage users</h1>
        <p className="text-sm">
          Manage users by banning their account, or maybe changing their role.
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4 mt-6">
        {data.map((user) => (
          <article
            key={user.id}
            className="px-4 py-3 border dark:border-neutral-800 rounded-md relative"
          >
            <figure className="flex items-start gap-3">
              <Image
                src={gradient}
                className="rounded-full aspect-square object-cover size-10"
                role="presentation"
                alt={`Picture for ${user.username}`}
                width={100}
                height={100}
                quality={100}
              />

              <figcaption>
                <dl>
                  <dt className="sr-only">username</dt>
                  <dd>{user.username}</dd>

                  <dt className="sr-only">email</dt>
                  <dd className="text-gray-600 text-sm">
                    <a
                      href={`mailto:${'johurul@gmail.com'}`}
                      className="hover:underline"
                    >
                      {user.email}
                    </a>
                  </dd>
                </dl>
              </figcaption>
            </figure>

            <dl className="absolute right-4 top-3 capitalize text-xs flex items-center gap-x-3">
              <dt className="sr-only">User role</dt>
              <dd className="border dark:border-neutral-800 rounded-full px-2 py-0.5">
                {user.role.toLowerCase()}
              </dd>

              <dt className="sr-only">Account status</dt>
              <dd className="border dark:border-neutral-800 rounded-full px-2 py-0.5">
                {user.status.toLowerCase()}
              </dd>
            </dl>

            <ToggleUserInfo
              userId={user.id}
              role={user.role}
              status={user.status}
            />
          </article>
        ))}
      </div>
    </main>
  );
}
