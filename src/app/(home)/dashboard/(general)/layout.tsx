import { NavBar } from './_components/nav-bar';

export default function GeneralPageLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
