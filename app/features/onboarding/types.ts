export type OnboardingView = "splash" | "role-select";

export type UserRole = "lawyer" | "individual" | "company";

export type RoleOption = {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
};
