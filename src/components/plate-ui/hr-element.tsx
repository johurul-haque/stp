import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import { useFocused, useSelected } from 'slate-react';

export const HrElement = withRef<typeof PlateElement>(
  ({ className, nodeProps, ...props }, ref) => {
    const { children } = props;

    const selected = useSelected();
    const focused = useFocused();

    return (
      <PlateElement ref={ref} {...props}>
        <div className='py-6' contentEditable={false}>
          <hr
            {...nodeProps}
            className={cn(
              'h-0.5 cursor-pointer rounded-sm border-none bg-neutral-100 bg-clip-content dark:bg-neutral-800',
              selected && focused && 'ring-2 ring-neutral-950 ring-offset-2 dark:ring-neutral-300',
              className
            )}
          />
        </div>
        {children}
      </PlateElement>
    );
  }
);
