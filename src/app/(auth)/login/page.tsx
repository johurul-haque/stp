import { LoginForm } from './_form';

type PageProps = {
  searchParams?: {
    redirect_from?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  return <LoginForm redirectFrom={searchParams?.redirect_from} />;
}
