import { createContext } from "react";
import type { LoggedInUser } from "@/types/user.types";

export const UserContext = createContext<{
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
}>({ user: null, setUser: () => {} });
