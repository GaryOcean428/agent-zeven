"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var react_1 = require("@testing-library/react");
var theme_provider_1 = require("../../components/theme-provider");
(0, vitest_1.describe)('Theme Provider', function () {
    (0, vitest_1.it)('should render children with theme context', function () {
        var container = (0, react_1.render)(<theme_provider_1.ThemeProvider>
        <div className="bg-background text-foreground">
          Test content
        </div>
      </theme_provider_1.ThemeProvider>).container;
        (0, vitest_1.expect)(container).toBeTruthy();
        (0, vitest_1.expect)(container.firstChild).toHaveClass('bg-background', 'text-foreground');
    });
});
