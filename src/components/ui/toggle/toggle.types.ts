export type ToggleSize = "sm" | "md";

export type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};
