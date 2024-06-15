import * as D from "@/components/ui/dialog";
import { SetStateActionType } from "@/types/set-state-action";
import { CheckIcon } from "lucide-react";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ACCOUNTS = [
  {
    role: "user",
    canDo: `Can perform actions on the trips they created. Send join requests to other trips posts, update account information etc.`,
  },
  {
    role: "admin",
    canDo:
      "Ability to perform actions on all of the trips posted by anyone. Mange users, activating or blocking account," +
      " change user roles etc.",
  },
];

export type DemoCredentials = {
  email: string;
  password: string;
};

type PropsType = {
  setDemoCredentials: SetStateActionType<DemoCredentials | undefined>;
};

export function DemoAccountsModal({ setDemoCredentials }: PropsType) {
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <D.Dialog>
      <D.DialogTrigger className="text-sm mt-2 max-w-fit mx-auto">
        Or use a{" "}
        <span className="underline underline-offset-2">demo account</span>
      </D.DialogTrigger>

      <D.DialogContent
        className={`sm:max-w-[550px] overflow-y-auto max-h-[94svh] ${inter.className}`}
      >
        <D.DialogHeader className="mt-2">
          <D.DialogTitle className="flex gap-2">Demo Accounts</D.DialogTitle>
          <D.DialogDescription className="text-left">
            Select one of the accounts from below to interact with the
            application.
          </D.DialogDescription>
        </D.DialogHeader>

        <ul className="space-y-3">
          {ACCOUNTS.map(({ role, canDo }) => (
            <li
              key={role}
              className={cn(
                "relative border dark:border-neutral-800 rounded-md px-4 py-2.5 hover:bg-neutral-200" +
                  " dark:hover:bg-neutral-800",
                {
                  "bg-neutral-200 dark:bg-neutral-800": role === selectedRole,
                },
              )}
            >
              <button
                className="absolute inset-0 z-10"
                onClick={() => setSelectedRole(role)}
              >
                <span className="sr-only">
                  Use demo account with role of {role}
                </span>
              </button>

              <div className="flex justify-between">
                <h3 className="max-sm:text-sm font-semibold capitalize opacity-90">
                  {role}
                </h3>
                {role === selectedRole && (
                  <CheckIcon className="size-4 text-emerald-600" />
                )}
              </div>

              <p className="text-xs sm:text-sm font-light opacity-70 mt-1 sm:mt-0.5">
                {canDo}
              </p>
            </li>
          ))}
        </ul>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDemoCredentials(getCredentials(selectedRole));
          }}
        >
          <D.DialogClose asChild>
            <Button type="submit" className="w-full" disabled={!selectedRole}>
              Continue
            </Button>
          </D.DialogClose>
        </form>
      </D.DialogContent>
    </D.Dialog>
  );
}

function getCredentials(role?: string) {
  switch (role) {
    case "admin":
      return {
        email: "johurul@admin.com",
        password: "johurul",
      };
    default:
      return {
        email: "johurul@nnobd.org",
        password: "johurul",
      };
  }
}
