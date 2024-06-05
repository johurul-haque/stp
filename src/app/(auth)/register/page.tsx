import { RegisterForm } from './_form';

type PageProps = {
  searchParams?: {
    redirect_from?: string;
  };
};

export default async function Register({ searchParams }: PageProps) {
  return <RegisterForm redirectFrom={searchParams?.redirect_from} />;
}
