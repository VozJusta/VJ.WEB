import { forwardRef } from "react";
import { AutorenewRounded } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.styles";
import { ButtonProps } from "./button.types";

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

    const isDisabled = disabled || loading;

    if ("href" in props && props.href) {
      const { href, ...anchorProps } =
        props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes + " cursor-pointer"}
          aria-disabled={isDisabled}
          {...(isDisabled ? { tabIndex: -1, role: "button" } : {})}
          {...anchorProps}
        >
          {loading && (
            <span className="mr-2">
              <AutorenewRounded aria-hidden fontSize="small" className="animate-spin" />
            </span>
          )}
          {!loading && leftIcon && (
            <span className="mr-2 inline-flex">{leftIcon}</span>
          )}
          {children}
          {!loading && rightIcon && (
            <span className="ml-2 inline-flex">{rightIcon}</span>
          )}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes + " cursor-pointer"}
        disabled={isDisabled}
        aria-busy={loading}
        type={
          (props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ||
          "button"
        }
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {loading && (
          <span className="mr-2">
            <AutorenewRounded aria-hidden fontSize="small" className="animate-spin" />
          </span>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
