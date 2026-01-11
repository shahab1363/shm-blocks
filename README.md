# SHM Blocks

A WordPress Gutenberg block plugin featuring custom blocks with advanced hover effects and animations.

## Blocks Included

### Poster Block

An interactive cover-style block with a full background image and animated overlay panels that reveal additional content on hover.

**Key Features:**
- Full-bleed background image with focal point control
- Two content states: default (visible) and hover (revealed on interaction)
- Configurable transparent overlay with customizable color and opacity
- 5 overlay animation types and 4 content animation types
- Touch device support (tap-to-toggle)
- Fully accessible with keyboard navigation
- Entire block can be a clickable link

## Installation

### From Source

1. Clone or download this repository to your `wp-content/plugins/` directory
2. Run `npm install` to install dependencies
3. Run `npm run build` to compile the blocks
4. Activate the plugin in WordPress admin

### Development

```bash
# Install dependencies
npm install

# Start development mode (watches for changes)
npm start

# Build for production
npm run build

# Lint JavaScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css
```

## Usage

### Adding a Poster Block

1. In the WordPress editor, click the "+" button to add a new block
2. Search for "Poster" or find it under the "SHM Blocks" category
3. Select a background image using the media library
4. Add content to both the default and hover states

### Switching Between States

The Poster block has two content areas:

- **Default State**: Content visible when the block is not being hovered
- **Hover State**: Content revealed when the user hovers over the block

To switch between editing these states:
1. Select the Poster block
2. In the toolbar, click the "Default" / "Hover" toggle button
3. Edit the content for each state

Use the "Preview" button (play icon) in the toolbar to see how the hover animation will look.

## Block Settings

### Image Settings

| Setting | Description |
|---------|-------------|
| Background Image | The main image displayed behind the overlay |
| Focal Point | Control which part of the image stays visible when cropped |
| Alt Text | Accessibility description for the image |

### Link Settings

| Setting | Description |
|---------|-------------|
| URL | Destination when the block is clicked |
| Open in new tab | Whether to open the link in a new browser tab |

### Overlay Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Color | Background color of the overlay panel | `#000000` |
| Position | Where the overlay appears: Bottom or Top | Bottom |
| Default Opacity | Transparency in default state (0-100%) | 60% |
| Hover Opacity | Transparency in hover state (0-100%) | 80% |
| Default Height | Height of overlay in default state | 30% |
| Hover Height | Height of overlay in hover state | 100% |

### Animation Settings

#### Overlay Animations

| Type | Description |
|------|-------------|
| **Slide** | Overlay slides from its initial position to full coverage |
| **Fade** | Overlay crossfades between states (no movement) |
| **Scale** | Overlay scales up from its initial size |
| **Blur** | Background image blurs while overlay transitions |
| **Slide & Fade** | Combination of slide and fade for smoother effect |

#### Content Animations

| Type | Description |
|------|-------------|
| **Fade Up** | Content fades in while moving up slightly |
| **Fade** | Simple fade in/out |
| **Scale** | Content scales in from a smaller size |
| **Stagger** | Each content element animates in sequence with a delay |

#### Timing Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Transition Duration | How long the animation takes (100-1000ms) | 400ms |
| Content Delay | Delay before content starts animating (0-500ms) | 100ms |
| Easing | Animation curve (ease, ease-in, ease-out, ease-in-out, linear) | ease-in-out |

### Dimension Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Minimum Height | Minimum height of the block | 400px |
| Aspect Ratio | Fixed aspect ratio (16:9, 4:3, 1:1, 3:4, 9:16) | None |

## Mobile/Touch Behavior

On touch devices where hover is not available:

1. **First tap**: Shows the hover state content
2. **Second tap**: Navigates to the link (if set)
3. **Tap outside**: Closes the hover state

This provides a consistent experience across all devices.

## Accessibility

- Full keyboard navigation support
- Focus states trigger hover content visibility
- Screen reader compatible with proper ARIA attributes
- Respects `prefers-reduced-motion` for users who prefer less animation
- Alt text support for background images

## CSS Custom Properties

The block uses CSS custom properties for dynamic styling. You can override these in your theme:

```css
.wp-block-shm-poster {
    --poster-overlay-color: #000;
    --poster-overlay-opacity: 0.6;
    --poster-overlay-opacity-hover: 0.8;
    --poster-overlay-height: 30%;
    --poster-overlay-height-hover: 100%;
    --poster-transition-duration: 400ms;
    --poster-transition-easing: ease-in-out;
    --poster-content-delay: 100ms;
    --poster-min-height: 400px;
}
```

## Block Structure

The Poster block uses child blocks for content management:

```
shm/poster (parent)
├── shm/poster-content-default (default state content)
│   └── [Any inner blocks: headings, paragraphs, buttons, etc.]
└── shm/poster-content-hover (hover state content)
    └── [Any inner blocks: headings, paragraphs, buttons, etc.]
```

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

The block uses CSS `:has()` selector for focus states, which has broad support in modern browsers. Touch handling includes fallbacks for older mobile browsers.

## Requirements

- WordPress 6.1+
- PHP 7.4+

## Development

### File Structure

```
shm-blocks/
├── shm-blocks.php           # Main plugin file
├── package.json             # Node dependencies
├── src/
│   ├── index.js             # Block registration entry
│   └── blocks/
│       ├── poster/
│       │   ├── block.json   # Block metadata & attributes
│       │   ├── index.js     # Block registration
│       │   ├── edit.js      # Editor component
│       │   ├── save.js      # Frontend output
│       │   ├── style.scss   # Frontend styles
│       │   ├── editor.scss  # Editor-only styles
│       │   └── view.js      # Frontend JavaScript
│       ├── poster-content-default/
│       │   ├── block.json
│       │   ├── index.js
│       │   ├── edit.js
│       │   └── save.js
│       └── poster-content-hover/
│           ├── block.json
│           ├── index.js
│           ├── edit.js
│           └── save.js
└── build/                   # Compiled assets (generated)
```

### Adding New Blocks

1. Create a new directory under `src/blocks/`
2. Add `block.json`, `index.js`, `edit.js`, and `save.js`
3. Import the block in `src/index.js`
4. Register the block in `shm-blocks.php`

## License

GPL-2.0-or-later

## Credits

Developed by SHM
