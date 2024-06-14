"use client";

import { LoginForm } from "./_form";
import { AlertDestructive } from "@/components/ui/alert";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DemoAccountsModal,
  DemoCredentials,
} from "@/app/(auth)/_components/demo-accounts-modal";

export default function Page() {
  const searchParams = useSearchParams();
  const redirectFrom = searchParams.get("redirect_from");
  const [error, setError] = useState("");
  const [demoCredentials, setDemoCredentials] = useState<DemoCredentials>();

  return (
    <>
      {error && <AlertDestructive message={error} />}

      <LoginForm
        key={demoCredentials?.email}
        demoCredentials={demoCredentials}
        setError={setError}
        redirectFrom={redirectFrom}
      />

      <DemoAccountsModal setDemoCredentials={setDemoCredentials} />
    </>
  );
}
