"use client";

import { RegisterForm } from "./_form";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageSquareWarningIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Register() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const redirectFrom = searchParams.get("redirect_from");

  return (
    <>
      <Alert className={cn("[&>svg~*]:pl-8", error && "border-violet-200")}>
        <MessageSquareWarningIcon size={23} className="stroke-violet-600" />

        <AlertTitle>Project Archived</AlertTitle>
        <AlertDescription>
          Use demo accounts from the{" "}
          <Link href="/login" className="underline underline-offset-2">
            login
          </Link>{" "}
          page.
        </AlertDescription>

        <div
          className={cn(
            "absolute -z-10 inset-0 bg-violet-600/35 blur-2xl animate-pulse opacity-0 transition-opacity",
            error && "opacity-100",
          )}
        />
      </Alert>

      <RegisterForm setError={setError} redirectFrom={redirectFrom} />
    </>
  );
}
