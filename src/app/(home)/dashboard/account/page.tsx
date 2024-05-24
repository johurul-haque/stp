import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/api/get-user';
import { AccountForm } from './_form';
import { ChangePasswordModal } from './_form/change-password/modal';

export default async function SettingsAccountPage() {
  const user = await getUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Account</h1>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred username and email.
        </p>
      </div>
      <Separator />
      <AccountForm user={user?.data} />

      <div className="border dark:border-neutral-800 rounded-md p-3 flex justify-between items-center">
        <div className="pl-2">
          <h2 className="font-medium">Change password?</h2>
        </div>
        <ChangePasswordModal>
          <Button size={'sm'} variant={'secondary'}>
            Reset
          </Button>
        </ChangePasswordModal>
      </div>
    </div>
  );
}
