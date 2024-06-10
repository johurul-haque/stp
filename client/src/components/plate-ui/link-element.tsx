import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { PlateElement, useElement } from '@udecode/plate-common';
import { type TLinkElement, useLink } from '@udecode/plate-link';

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        asChild
        className={cn(
          'font-medium text-neutral-900 underline decoration-primary underline-offset-4 dark:text-neutral-50',
          className
        )}
        ref={ref}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    );
  }
);
