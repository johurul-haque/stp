"use client";

import { LoginForm } from "./_form";
import { AlertDestructive } from "@/components/ui/alert";
import { Suspense, useState } from "react";
import {
  DemoAccountsModal,
  DemoCredentials,
} from "../_components/demo-accounts-modal";

export default function Page() {
  const [error, setError] = useState("");
  const [demoCredentials, setDemoCredentials] = useState<DemoCredentials>();

  return (
    <>
      {error && <AlertDestructive message={error} />}

      <Suspense>
        <LoginForm
          key={demoCredentials?.email}
          demoCredentials={demoCredentials}
          setError={setError}
        />
      </Suspense>

      <DemoAccountsModal setDemoCredentials={setDemoCredentials} />
    </>
  );
}
