import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/api/get-user';
import { ChangePasswordModal } from './_components/change-password/modal';
import { DeleteAccountModal } from './_components/delete-account';
import { AccountForm } from './_components/form';

export default async function AccountSettingsPage() {
  const user = await getUser();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-lg font-medium">Account</h1>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred username and email.
        </p>
      </div>

      <Separator />
      <AccountForm user={user?.data} />

      <div className="border dark:border-neutral-800 rounded-md p-3 flex justify-between items-center">
        <h2 className="font-medium pl-2">Change password?</h2>

        <ChangePasswordModal>
          <Button size={'sm'} variant={'secondary'}>
            Proceed
          </Button>
        </ChangePasswordModal>
      </div>

      <div className="border border-rose-200 dark:border-rose-950 rounded-md p-3 flex justify-between items-center">
        <h2 className="font-medium pl-2">Delete account?</h2>

        <DeleteAccountModal>
          <Button size={'sm'} variant={'destructive'}>
            Proceed
          </Button>
        </DeleteAccountModal>
      </div>
    </div>
  );
}
