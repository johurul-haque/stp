"use client";

import { RegisterForm } from "./_form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AlertDestructive } from "@/components/ui/alert";

export default function Register() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const redirectFrom = searchParams.get("redirect_from");

  return (
    <>
      {error && <AlertDestructive message={error} />}
      <RegisterForm setError={setError} redirectFrom={redirectFrom} />
    </>
  );
}
