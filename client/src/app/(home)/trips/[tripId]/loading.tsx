import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="container lg:min-h-[40rem] flex max-xl:max-w-xl max-xl:flex-col gap-8 py-8">
      <div className="max-w-xl w-full">
        <Skeleton className="w-full aspect-video" />
      </div>

      <dl className="xl:max-h-full flex flex-col xl:flex-1 xl:overflow-y-auto pb-6">
        <div className="grid xs:grid-cols-2 gap-y-6 xs:gap-y-5">
          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mb-0.5">
              Destination
            </dt>
            <dd>
              <Skeleton className="h-6 w-32" />
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70 mb-0.5">
              Date
            </dt>
            <dd>
              <Skeleton className="h-6 w-48" />
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mb-2">
              travel type
            </dt>
            <dd>
              <Skeleton className="h-6 w-16 rounded-full" />
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70 mb-2">
              <Skeleton className="h-6 w-28" />
            </dt>
            <dd>
              <Skeleton className="h-8 w-32 rounded-full" />
            </dd>
          </div>
        </div>

        <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mt-6 xs:mt-5 mb-2">
          Description
        </dt>
        <dd className="flex-1">
          <Skeleton className="w-full h-48" />
        </dd>
      </dl>
    </main>
  );
}
