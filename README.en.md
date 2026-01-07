# PLM Integration Demo

A reference extension for PLM (Product Lifecycle Management) integration with JLCEDA Pro.

## Features

- **Project Checkout**: Checkout project files (.epro) from PLM system, auto-import and open in JLCEDA
- **Project Checkin**: Checkin current project back to PLM system
- **BOM Sync**: Upload BOM file along with project during checkin
- **Auto Cleanup**: Optionally delete local project after checkin
- **Multi-scene Support**: Available in Home, Schematic Editor, and PCB Editor

> **Note**: This extension supports switching between Mock mode and Real API mode in settings.

## Usage

### 1. Configure PLM Connection

Configure PLM server connection before first use.

**Menu Path**: `PLM` → `Settings...`

Configuration Items:
| Item | Description |
| ------------- | -------------------------------------------- |
| Save Location | Select team for saving projects |
| Username | PLM system login username |
| Password | PLM system login password |
| Domain URL | PLM server address, e.g. `http://plm.example.com` |
| API Mode | Switch between Mock mode and Real API mode |

### API Mode Description

| Mode     | Description                                                                         |
| -------- | ----------------------------------------------------------------------------------- |
| Mock     | Uses built-in mock data, no real PLM server required, suitable for demo and testing |
| Real API | Connects to real PLM server, calls actual APIs for checkin/checkout operations      |

After switching modes, all Toast messages will display current mode (e.g., `Checkin successful (Mock)`).

### 2. Checkout Project

Checkout project files from PLM system for local editing.

**Menu Path**: `PLM` → `PLM Checkout...`

Steps:

1. Enter project code in search box, or select from list
2. Select file type (PCB or Schematic)
3. Select project to checkout in "Query List"
4. Click "View" for read-only preview
5. Click "Edit" to checkout project (editable import, status changes to checked out)

Interface Description:

- **Query List**: Shows projects available for checkout (status: checked in)
- **Checkout List**: Shows currently checked out projects (status: checked out)

### 3. Checkin Project

Checkin edited project back to PLM system.

**Menu Path**: `PLM` → `PLM Checkin...` (in Schematic or PCB Editor)

Options:
| Option | Description |
| ---------------------- | ----------------------------------------- |
| Upload BOM to PLM | Generate and upload BOM file during checkin |
| Delete project after checkin | Delete current project after checkin completes |

## Development Guide

### Project Structure

```
eext-plm-integration-demo/
├── src/
│   └── index.ts          # Extension entry file
├── iframe/
│   ├── download.html     # Checkout interface
│   ├── upload.html       # Checkin interface
│   ├── setting.html      # Settings interface
│   └── jszip.min.js      # ZIP processing library
├── postman/              # Postman API collections
├── locales/              # i18n files
├── images/
│   └── logo.png          # Extension icon
├── extension.json        # Extension config
└── package.json          # Project config
```

### Build

```bash
# Install dependencies
npm install

# Compile and package
npm run build
```

### Customization

This extension has built-in support for Mock mode and Real API mode switching. In Real API mode, the following endpoints are called:

#### Settings API

| Endpoint          | Method | Description         |
| ----------------- | ------ | ------------------- |
| `/api/auth/login` | POST   | User authentication |

#### Checkout API

| Endpoint                      | Method | Description             |
| ----------------------------- | ------ | ----------------------- |
| `/api/projects`               | GET    | Get project list        |
| `/api/projects/search`        | GET    | Search projects         |
| `/api/projects/{id}/checkout` | POST   | Checkout (lock) project |
| `/api/projects/{id}/download` | GET    | Download project file   |

#### Checkin API

| Endpoint                     | Method | Description     |
| ---------------------------- | ------ | --------------- |
| `/api/projects/{id}/checkin` | POST   | Checkin project |
| `/api/projects/{id}/bom`     | POST   | Upload BOM      |

> For complete API definitions, refer to Postman Collection files in `postman/` directory.

To customize API endpoints or parameters, modify:

1. **`iframe/setting.html`** - Login verification logic
2. **`iframe/download.html`** - Checkout API calls
3. **`iframe/upload.html`** - Checkin API calls

## Links

- [JLCEDA Pro](https://pro.lceda.cn/)
- [Extension API Documentation](https://prodocs.lceda.cn/cn/extension/started/quick-start/)
- [Issue Tracker](https://github.com/easyeda/eext-plm-integration-demo/issues)
