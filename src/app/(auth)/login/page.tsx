'use client';

import { AlertDestructive } from '@/components/ui/alert';
import { useState } from 'react';
import { LoginForm } from './_form';

export default function Page() {
  const [error, setError] = useState<string>();

  return (
    <>
      {error && <AlertDestructive message={error} />}
      <LoginForm setError={setError} />
    </>
  );
}
