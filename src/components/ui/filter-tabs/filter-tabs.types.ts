export type FilterTabItem<T extends string = string> = {
  value: T;
  label: string;
  count?: number;
};

export type FilterTabsProps<T extends string = string> = {
  tabs: FilterTabItem<T>[];
  activeTab: T;
  onTabChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
};
