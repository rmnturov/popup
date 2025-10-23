# Koobiq Design Tokens Setup

This project has been configured to use **@koobiq/design-tokens** for consistent styling across components.

## 🎨 What's Included

- **CSS Design Tokens**: Complete set of design tokens for colors, typography, spacing, and more
- **Light & Dark Themes**: Support for both light and dark color schemes
- **Component Tokens**: Pre-defined tokens for common UI components

## 📦 Installation

The package is already installed:

```bash
npm install @koobiq/design-tokens
```

## 🚀 Setup

### 1. CSS Imports

The design tokens are imported directly from the npm package in `src/index.css`:

```css
/* Koobiq Design Tokens */
@import '@koobiq/design-tokens/web/css-tokens.css';
@import '@koobiq/design-tokens/web/css-tokens-light.css';
@import '@koobiq/design-tokens/web/css-tokens-font.css';
```

**Note**: No need to copy files locally - the package is imported directly from `node_modules`.

### 2. Theme Class

The HTML body has the light theme class applied:

```html
<body class="kbq-light">
```

### 3. CSS Variables Usage

Koobiq tokens are available as CSS custom properties:

```css
:root {
  --kbq-theme-default: #007bff;
  --kbq-success-default: #28a745;
  --kbq-background-bg: #ffffff;
  --kbq-font-family-accent: 'Inter', sans-serif;
  --kbq-font-family-base: 'Inter', sans-serif;
  --kbq-size-xs: 6px;
  --kbq-size-s: 8px;
  --kbq-size-m: 12px;
  /* ... more tokens */
}
```

## 🎯 Usage Examples

### Colors

```css
/* Theme colors */
.primary-theme {
  background-color: var(--kbq-bg-theme);
  color: var(--kbq-white);
}

.success-state {
  background-color: var(--kbq-bg-success);
  color: var(--kbq-white);
}

/* Background variations */
.primary-bg {
  background-color: var(--kbq-bg);
}

.secondary-bg {
  background-color: var(--kbq-bg-secondary);
}

/* Text colors */
.primary-text {
  color: var(--kbq-contrast);
}

.secondary-text {
  color: var(--kbq-contrast);
  opacity: 0.7;
}
```

### Typography

```css
.accent-heading {
  font-family: var(--kbq-font-family-accent);
  font-size: 1.875rem;
  font-weight: bold;
}

.base-paragraph {
  font-family: var(--kbq-font-family-base);
  color: var(--kbq-contrast);
}

.monospace-code {
  font-family: var(--kbq-font-family-mono);
}
```

### Spacing

```css
.large-padding {
  padding: var(--kbq-xl);
  margin: var(--kbq-l);
}

.medium-spacing > * + * {
  margin-top: var(--kbq-m);
}

.small-gap {
  gap: var(--kbq-s);
}
```

### Border Radius & Borders

```css
.rounded-card {
  border-radius: var(--kbq-border-radius);
  border: 1px solid var(--kbq-contrast);
  opacity: 0.2;
}
```

## 🌙 Theme Switching

To switch between light and dark themes, change the body class:

```javascript
// Light theme
document.body.className = 'kbq-light';

// Dark theme
document.body.className = 'kbq-dark';
```

## 📚 Available Tokens

### Colors
- **Theme**: `kbq-theme`, `kbq-success`, `kbq-warning`, `kbq-error`
- **Backgrounds**: `kbq-bg`, `kbq-bg-secondary`, `kbq-bg-card`, `kbq-bg-theme-fade`
- **Text**: `kbq-contrast`, `kbq-white`, `kbq-black`

### Typography
- **Fonts**: `font-kbq-accent`, `font-kbq-base`, `font-kbq-mono`

### Spacing
- **Sizes**: `kbq-3xs` (2px) to `kbq-7xl` (64px)
- **Common**: `kbq-xs` (6px), `kbq-s` (8px), `kbq-m` (12px), `kbq-l` (16px), `kbq-xl` (20px)

### Other
- **Border Radius**: `rounded-kbq` (8px)
- **Border Width**: `border-kbq` (1px)

## 🧩 Component Example

See `src/components/KoobiqExample.tsx` for a comprehensive example of using Koobiq design tokens in components.

## 🔗 Resources

- [Koobiq Design Tokens Documentation](https://github.com/koobiq/design-tokens)
- [Available CSS Variables](node_modules/@koobiq/design-tokens/web/css-tokens.css) (imported directly from package)
- [Component Tokens](node_modules/@koobiq/design-tokens/web/components/)

## 💡 Tips

1. **Use semantic color names**: Prefer `var(--kbq-bg-theme)` over specific color values
2. **Leverage opacity**: Use CSS opacity property for subtle variations
3. **Consistent spacing**: Use the `--kbq-size-*` variables for consistent layouts
4. **Theme-aware**: All colors automatically adapt to light/dark themes
