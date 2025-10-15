# Frontend Conventions

This document outlines the conventions to be followed in the frontend codebase.

## Folder Structure and Barrel Files

- **Components**: Reusable components are organized into folders based on their functionality (e.g., `input`, `layout`, `ui`).
- **Barrel Files (`index.js`)**: Each component folder should have an `index.js` file that exports all the components in that folder. This is also known as a "barrel" file.

### Export Convention

Components should be exported from the `index.js` file using the `export { default as ComponentName } from './ComponentFile';` syntax. For re-exporting from other barrel files, use `export * from './directory';`.

**Example (`src/components/layout/index.js`):**
```javascript
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
```

**Example (`src/components/index.js`):**
```javascript
export * from './ui';
export * from './layout';
export * from './input';
```

### Import Convention

When importing components, always import them from the barrel file of the corresponding folder. This makes the import statements cleaner and easier to manage.

**GOOD:**
```javascript
import { Navbar, Footer } from '../../components';
import { Button } from '../../components/ui';
```

**BAD:**
```javascript
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
```
