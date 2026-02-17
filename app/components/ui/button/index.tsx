import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button.styles';
import { ButtonProps } from './button.types';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

    const isDisabled = disabled || loading;

    if ('href' in props && props.href) {
      const { href, ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes + ' cursor-pointer'}
          aria-disabled={isDisabled}
          {...(isDisabled ? { tabIndex: -1, role: 'button' } : {})}
          {...anchorProps}
        >
          {loading && (
            <span className="mr-2 animate-spin">
              <svg 
                className="h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          )}
          {!loading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
          {children}
          {!loading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes + ' cursor-pointer'}
        disabled={isDisabled}
        aria-busy={loading}
        type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading && (
          <span className="mr-2 animate-spin">
            <svg 
              className="h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {!loading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
