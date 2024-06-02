'use client';

import { AlertDestructive } from '@/components/ui/alert';
import { useState } from 'react';
import { RegisterForm } from './_form';

export default function Register() {
  const [error, setError] = useState<string | undefined>('');

  return (
    <>
      {error && <AlertDestructive message={error} />}
      <RegisterForm setError={setError} />
    </>
  );
}
