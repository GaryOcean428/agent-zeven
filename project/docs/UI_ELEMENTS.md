# UI Elements Documentation

## Core Layout Components

### 1. Main Layout
- **App Shell**
  - Fixed header with navigation
  - Collapsible sidebar
  - Main content area
  - Status bar
  - Theme toggle (dark/light)

- **Navigation**
  - Primary navigation tabs
  - Secondary navigation menu
  - Breadcrumb trail
  - Quick actions menu

### 2. Panel System
- **Panel Container**
  - Resizable panels
  - Panel tabs
  - Drag and drop support
  - Panel state persistence

- **Panel Types**
  ```typescript
  type PanelType = 'chat' | 'canvas' | 'agent' | 'tools' | 'documents' | 'search' | 'settings';
  ```

## Feature-Specific Components

### 1. Chat Panel
- **Chat Interface**
  - Message list container
  - Message bubbles (user/AI)
  - Code blocks with syntax highlighting
  - Markdown rendering
  - File attachments
  - Image previews

- **Input Area**
  - Rich text editor
  - Command palette
  - Emoji picker
  - File upload
  - Send button
  - Typing indicators

- **Context Display**
  - Active model indicator
  - Memory status
  - Token count
  - Response streaming indicator

### 2. Canvas Panel
- **Toolbar**
  - Selection tools
  - Shape tools
  - Text tools
  - Drawing tools
  - Export options
  - Zoom controls
  - Grid toggle

- **Properties Panel**
  - Position controls
  - Size inputs
  - Style properties
  - Text formatting
  - Layer settings

- **Canvas Area**
  - Design surface
  - Rulers
  - Guidelines
  - Selection handles
  - Transform controls

### 3. Agent Panel
- **Agent List**
  - Agent cards
  - Status indicators
  - Task queues
  - Performance metrics

- **Agent Details**
  - Configuration settings
  - Activity logs
  - Resource usage
  - Error reports

### 4. Tools Panel
- **Tool Categories**
  - Data processing tools
  - Search tools
  - Code tools
  - Export tools

- **Tool Interface**
  - Tool configuration
  - Input/output areas
  - Progress indicators
  - Results display

### 5. Documents Panel
- **Document List**
  - Grid/list view toggle
  - Sort controls
  - Filter options
  - Search bar
  - Tag system

- **Document Preview**
  - Content preview
  - Metadata display
  - Action buttons
  - Version history

### 6. Search Panel
- **Search Interface**
  - Search input
  - Provider selection
  - Filter controls
  - Sort options

- **Results Display**
  - Result cards
  - Preview snippets
  - Source indicators
  - Relevance scores

## Common UI Elements

### 1. Buttons 