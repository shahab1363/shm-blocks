# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SHM Blocks is a WordPress Gutenberg block plugin. The first block is the **Poster Block** - an interactive cover-style block with hover-triggered overlay animations.

## Build Commands

```bash
# Install dependencies
npm install

# Development mode (watches for changes, rebuilds automatically)
npm start

# Production build
npm run build

# Lint JavaScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css

# Format code (Prettier)
npm run format
```

## Architecture

### Technology Stack
- **WordPress Block API v3** with `block.json` metadata
- **@wordpress/scripts** for build tooling (webpack-based)
- **React** for editor components
- **SCSS** for styling
- **WordPress 6.1+** and **PHP 7.4+** required

### Block Structure

The plugin uses a parent-child block pattern to handle multiple InnerBlocks:

```
shm/poster (parent block)
├── shm/poster-content-default (child - default state content)
└── shm/poster-content-hover (child - hover state content)
```

This architecture is necessary because Gutenberg doesn't support multiple InnerBlocks areas in a single block.

### File Organization

```
src/
├── index.js                    # Main entry - imports all blocks
└── blocks/
    ├── poster/                 # Parent block
    │   ├── block.json         # Block metadata & all attributes
    │   ├── index.js           # Registration & icon
    │   ├── edit.js            # Editor component (most complex)
    │   ├── save.js            # Frontend save output
    │   ├── style.scss         # Frontend + editor shared styles
    │   ├── editor.scss        # Editor-only styles
    │   └── view.js            # Frontend JS (touch handling)
    ├── poster-content-default/ # Child block for default state
    └── poster-content-hover/   # Child block for hover state
```

### Key Patterns

**CSS Custom Properties**: The poster block uses inline CSS variables for dynamic styling, set from block attributes in both `edit.js` and `save.js`.

**Animation Classes**: Animation types are applied as BEM modifier classes (e.g., `wp-block-shm-poster--animation-slide`). The CSS handles all animation variants.

**Touch Handling**: The `view.js` script provides tap-to-toggle behavior on mobile devices.

## Adding New Blocks

1. Create directory: `src/blocks/[block-name]/`
2. Create required files: `block.json`, `index.js`, `edit.js`, `save.js`
3. Import in `src/index.js`
4. Register in `shm-blocks.php` using `register_block_type(__DIR__ . '/build/blocks/[block-name]')`

## Block Attributes Reference

The poster block attributes are defined in `src/blocks/poster/block.json`:

- **Image**: `mediaId`, `mediaUrl`, `focalPoint`, `imageAlt`
- **Link**: `linkUrl`, `linkTarget`, `linkRel`
- **Overlay**: `overlayColor`, `overlayPosition`, `overlayOpacity`, `overlayOpacityHover`, `overlayHeight`, `overlayHeightHover`
- **Animation**: `animationType`, `contentAnimationType`, `transitionDuration`, `contentAnimationDelay`, `transitionEasing`
- **Dimensions**: `minHeight`, `aspectRatio`
- **Editor State**: `editingState` (not saved to post content)

## Releases

GitHub Actions automatically builds and attaches a `shm-blocks.zip` plugin file when a release is published. The ZIP contains only the production files needed for WordPress installation.

## WordPress Dependencies

The blocks use these WordPress packages (provided by WordPress, not bundled):
- `@wordpress/blocks`
- `@wordpress/block-editor`
- `@wordpress/components`
- `@wordpress/element`
- `@wordpress/i18n`
