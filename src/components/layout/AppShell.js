"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppShell = AppShell;
var theme_provider_1 = require("@/components/theme-provider");
var toaster_1 = require("@/components/ui/toaster");
function AppShell(_a) {
    var children = _a.children;
    return (<theme_provider_1.ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Existing layout structure */}
        {children}
        <toaster_1.Toaster />
      </div>
    </theme_provider_1.ThemeProvider>);
}
