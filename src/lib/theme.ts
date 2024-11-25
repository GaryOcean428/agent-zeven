import { type ThemeConfig } from "@/types";

export const themeConfig: ThemeConfig = {
  // Existing theme config
  components: {
    // Add shadcn component overrides
    card: {
      defaultVariants: {
        variant: "default"
      },
      variants: {
        agent: {
          base: "bg-secondary",
          header: "border-b border-border/50"
        }
      }
    }
  }
}; 