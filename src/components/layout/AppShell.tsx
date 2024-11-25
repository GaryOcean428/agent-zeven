import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Existing layout structure */}
        {children}
        <Toaster />
      </div>
    </ThemeProvider>
  );
} 