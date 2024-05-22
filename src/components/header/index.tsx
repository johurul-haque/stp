import { Logo } from './logo';

export function Header() {
  return (
    <header className="container pt-4 lg:pt-5 flex items-center justify-between">
      <Logo
        className={{
          wrapper: 'text-lg font-semibold',
          logo: 'md:size-7',
        }}
      />
    </header>
  );
}
