import { ElementType } from "react";

export type RoleCardProps = {
  title: string;
  description: string;
  icon: ElementType;
  isSelected: boolean;
  onSelect: () => void;
};
