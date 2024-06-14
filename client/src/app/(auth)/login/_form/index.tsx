"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { onSubmit } from "./on-submit";
import { loginSchema } from "./schema";
import { SetStateActionType } from "@/types/set-state-action";
import { DemoCredentials } from "@/app/(auth)/_components/demo-accounts-modal";

type PropsType = {
  redirectFrom: string | null;
  setError: SetStateActionType<string>;
  demoCredentials?: DemoCredentials;
};

export function LoginForm({
  redirectFrom,
  setError,
  demoCredentials,
}: PropsType) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      handle: demoCredentials?.email,
      password: demoCredentials?.password,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({ values, setIsLoading, setError, redirectFrom }),
          )}
          className="grid gap-3"
        >
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="transition-all"
                      type={isVisible ? "text" : "password"}
                      placeholder="****"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    title={isVisible ? "Hide password" : "Show password"}
                    onClick={() => setIsVisible(!isVisible)}
                    disabled={isLoading}
                    className="absolute translate-y-1/2 bottom-1/2 right-3 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span className="sr-only">
                      {isVisible ? "Hide" : "Show"} password
                    </span>
                    {isVisible ? "👀" : "🫣"}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
