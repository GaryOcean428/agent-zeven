# UI Components

## Shadcn Integration

The project uses shadcn/ui components as the base UI library. Key integrations:

### Base Components
- Button
- Input
- Card
- Dialog
- DropdownMenu
- Form
- Toast
- Tooltip

### Custom Components
All custom components should:
- Extend shadcn base components where possible
- Use the `cn()` utility for class merging
- Follow the established theme system
- Support dark mode 