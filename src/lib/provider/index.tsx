import { ThemeProvider } from "./theme-provider";
import AppStateProvider from "./state-provider";
import { SupabaseUserProvider } from "./supabase-user-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SupabaseUserProvider>{children}</SupabaseUserProvider>
      </ThemeProvider>
    </AppStateProvider>
  );
}
