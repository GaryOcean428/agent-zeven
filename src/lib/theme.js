"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeConfig = void 0;
exports.themeConfig = {
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
