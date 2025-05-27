import AppHeader from "./components/AppHeader";
import { useState } from "react";
import type { LoggedInUser } from "./types/user.types";
import { Outlet } from "react-router-dom";
import AppFooter from "./components/AppFooter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "./context/UserContext";
import { getSessionUser } from "./services/auth.service";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<LoggedInUser | null>(getSessionUser());

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppHeader />
        <Outlet />
        <AppFooter />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
