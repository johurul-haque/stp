import { deleteProfile } from '@/actions/delete-profile';
import * as D from '@/components/ui/dialog';
import { FormEvent, ReactNode, useState } from 'react';
import { AlertDestructive } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function DeleteAccountModal({ children }: { children: ReactNode }) {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await deleteProfile(inputValue);
    } catch (error) {
      setError((error as Error).message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <D.DialogTrigger asChild>{children}</D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader>
          <D.DialogTitle>Are you absolutely sure?</D.DialogTitle>
          <D.DialogDescription>
            This action can&apos;t be undone. It will permanently erase your
            account and all of the data associated with it.
          </D.DialogDescription>
        </D.DialogHeader>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="password">Password</Label>
          <div className="relative mb-3 mt-1">
            <Input
              className="transition-all"
              id="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type={isPasswordShowing ? 'text' : 'password'}
              placeholder="Enter your password"
              disabled={isLoading}
              required
            />

            <button
              type="button"
              onClick={() => setIsPasswordShowing(!isPasswordShowing)}
              disabled={isLoading}
              className="absolute translate-y-1/2 bottom-1/2 right-3"
            >
              <span className="sr-only">
                {isPasswordShowing ? 'Hide' : 'Show'} password
              </span>
              {isPasswordShowing ? '👀' : '🫣'}
            </button>
          </div>

          {error && <AlertDestructive message={error} />}

          <D.DialogFooter className="mt-3">
            <Button
              variant={'secondary'}
              type="button"
              disabled={isLoading}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant={'destructive'} disabled={isLoading}>
              Confirm
            </Button>
          </D.DialogFooter>
        </form>
      </D.DialogContent>
    </D.Dialog>
  );
}
