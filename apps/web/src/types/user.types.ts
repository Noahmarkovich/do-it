export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserFormFields = {
  email: string;
  name: string;
};

export type LoginFormFields = {
  email: string;
  name?: string;
  password: string;
  avatarUrl?: string;
};

export type LoggedInUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  token: string;
};
