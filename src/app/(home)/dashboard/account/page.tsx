import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/api/get-user';
import { AccountForm } from './_form';

export default async function SettingsAccountPage() {
  const user = await getUser();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user?.data} />
    </div>
  );
}
