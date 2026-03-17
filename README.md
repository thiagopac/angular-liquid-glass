# Angular Liquid Glass

`angular-liquid-glass` is a standalone Angular component library for liquid glass and glassmorphism interfaces. It is designed for Angular applications that want expressive translucent UI primitives without depending on custom design-system infrastructure first.

## Live Docs and Demos

- Live docs and demos: https://thiagopac.github.io/angular-liquid-glass-docs/
- npm package: https://www.npmjs.com/package/angular-liquid-glass

## Status

The library is public and ready for adoption, but still pre-`1.0.0`. Expect the API to evolve while the component set and naming stabilize.

## Why This Library

- Standalone Angular components with no NgModule setup required
- Liquid glass visual treatment built into the components
- Small, composable primitives instead of one large UI framework
- Suitable for demos, landing pages, internal tools, and experimental product interfaces

## Install

```bash
npm install angular-liquid-glass
```

Expected peer dependencies in the host application:

- `@angular/core` `^21.2.0`
- `@angular/common` `^21.2.0`

## Quick Start

```ts
import { Component } from '@angular/core';
import { LiquidGlassButtonComponent, LiquidGlassCardComponent } from 'angular-liquid-glass';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [LiquidGlassCardComponent, LiquidGlassButtonComponent],
  template: `
    <angular-liquid-glass-card width="320px" height="220px">
      <h2>Angular Liquid Glass</h2>
      <p>Standalone glassmorphism components for Angular.</p>
      <angular-liquid-glass-button> Explore </angular-liquid-glass-button>
    </angular-liquid-glass-card>
  `,
})
export class DemoComponent {}
```

## Package API

The current public entrypoint exports include:

- `LiquidGlassAccordionComponent`
- `LiquidGlassButtonComponent`
- `LiquidGlassCardComponent`
- `LiquidGlassDividerComponent`
- `LiquidGlassDropdownComponent`
- `LiquidGlassDropdownItemComponent`
- `LiquidGlassIconComponent`
- `LiquidGlassNavComponent`
- `LiquidGlassNavItemComponent`
- `LiquidGlassSpinnerComponent`
- `LiquidGlassToggleComponent`
- `LiquidGlassFilterService`

Import only what you need:

```ts
import {
  LiquidGlassAccordionComponent,
  LiquidGlassButtonComponent,
  LiquidGlassCardComponent,
  LiquidGlassDropdownComponent,
  LiquidGlassDropdownItemComponent,
  LiquidGlassIconComponent,
  LiquidGlassNavComponent,
  LiquidGlassNavItemComponent,
  LiquidGlassSpinnerComponent,
  LiquidGlassToggleComponent,
} from 'angular-liquid-glass';
```

## Component Guides

### Card

Use the card as a general-purpose glass container with content projection.

```html
<angular-liquid-glass-card
  width="320px"
  height="280px"
  blur="20px"
  borderRadius="24px"
  background="rgba(255, 255, 255, 0.08)"
  [scale]="120"
>
  <h2>Liquid Glass Card</h2>
  <p>Content is projected into the card body.</p>
</angular-liquid-glass-card>
```

Main inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `width`        | `string` | `300px`                     |
| `height`       | `string` | `200px`                     |
| `borderRadius` | `string` | `24px`                      |
| `blur`         | `string` | `20px`                      |
| `saturation`   | `string` | `180%`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

### Button

Use the button for projected text or inline content with hover highlight behavior.

```html
<angular-liquid-glass-button
  blur="7px"
  borderRadius="12px"
  background="rgba(255, 255, 255, 0.1)"
  [scale]="120"
>
  Continue
</angular-liquid-glass-button>
```

Main inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `blur`         | `string` | `4px`                       |
| `borderRadius` | `string` | `12px`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

### Accordion

Use the accordion when each item can manage its own open or closed state.

```html
<angular-liquid-glass-accordion label="What is this?" blur="7px" borderRadius="12px" [scale]="120">
  <p>A standalone glass accordion with animated open and close behavior.</p>
</angular-liquid-glass-accordion>
```

Main inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `label`        | `string` | required                    |
| `blur`         | `string` | `4px`                       |
| `borderRadius` | `string` | `12px`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

### Dropdown

Use the dropdown container with one or more dropdown items. The container provides the shared filter and style context.

```html
<angular-liquid-glass-dropdown blur="7px" borderRadius="12px" [scale]="120">
  <angular-liquid-glass-dropdown-item label="Features">
    <ul>
      <li>Liquid distortion effect</li>
      <li>Smooth open and close animation</li>
      <li>Reactive inputs</li>
    </ul>
  </angular-liquid-glass-dropdown-item>

  <angular-liquid-glass-dropdown-item label="Documentation">
    <p>Import both components and nest items inside the container.</p>
  </angular-liquid-glass-dropdown-item>
</angular-liquid-glass-dropdown>
```

Dropdown inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `blur`         | `string` | `4px`                       |
| `borderRadius` | `string` | `12px`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

Dropdown item inputs:

| Input   | Type     | Default  |
| ------- | -------- | -------- |
| `label` | `string` | required |

### Icons and Divider

Use the icon component as a glass container for projected SVGs and the divider to separate groups.

```html
<angular-liquid-glass-icon size="64px" blur="7px" borderRadius="16px" [scale]="120">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2" />
  </svg>
</angular-liquid-glass-icon>

<angular-liquid-glass-divider orientation="vertical" />
```

Icon inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `size`         | `string` | `64px`                      |
| `blur`         | `string` | `4px`                       |
| `borderRadius` | `string` | `16px`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

Divider inputs:

| Input         | Type                         | Default                     |
| ------------- | ---------------------------- | --------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `horizontal`                |
| `color`       | `string`                     | `rgba(255, 255, 255, 0.15)` |

### Nav

Use the nav container with projected icon tabs. The active tab index is emitted through `activeTabChange`.

```html
<angular-liquid-glass-nav
  blur="20px"
  borderRadius="40px"
  [scale]="120"
  (activeTabChange)="activeTab = $event"
>
  <angular-liquid-glass-nav-item label="Home">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10" />
    </svg>
  </angular-liquid-glass-nav-item>

  <angular-liquid-glass-nav-item label="Search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  </angular-liquid-glass-nav-item>
</angular-liquid-glass-nav>
```

Nav inputs:

| Input          | Type     | Default                     |
| -------------- | -------- | --------------------------- |
| `blur`         | `string` | `20px`                      |
| `borderRadius` | `string` | `40px`                      |
| `scale`        | `number` | `77`                        |
| `background`   | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`    | `string` | `rgba(255, 255, 255, 0.75)` |
| `textColor`    | `string` | `#ffffff`                   |

Nav item inputs:

| Input   | Type     | Default  |
| ------- | -------- | -------- |
| `label` | `string` | required |

Outputs:

| Output            | Type     | Description                   |
| ----------------- | -------- | ----------------------------- |
| `activeTabChange` | `number` | Emits the activated tab index |

### Spinner

Use the spinner when you need a loading state with the same glass treatment as the rest of the UI.

```html
<angular-liquid-glass-spinner
  size="80px"
  blur="7px"
  ringColor="rgba(255,255,255,0.9)"
  [scale]="120"
  [speed]="50"
/>
```

Main inputs:

| Input        | Type     | Default                     |
| ------------ | -------- | --------------------------- |
| `size`       | `string` | `80px`                      |
| `blur`       | `string` | `4px`                       |
| `scale`      | `number` | `77`                        |
| `speed`      | `number` | `50`                        |
| `ringColor`  | `string` | `rgba(255, 255, 255, 0.9)`  |
| `background` | `string` | `rgba(255, 255, 255, 0.01)` |
| `highlight`  | `string` | `rgba(255, 255, 255, 0.75)` |

### Toggle

Use the toggle with one-way or two-way checked state binding.

```html
<angular-liquid-glass-toggle
  label="Dark Mode"
  offColor="rgba(255,255,255,0.08)"
  onColor="rgba(255,255,255,0.30)"
  blur="7px"
  [scale]="120"
  [(checked)]="isDarkMode"
/>
```

Main inputs:

| Input       | Type      | Default                     |
| ----------- | --------- | --------------------------- |
| `label`     | `string`  | `''`                        |
| `checked`   | `boolean` | `false`                     |
| `offColor`  | `string`  | `rgba(255, 255, 255, 0.08)` |
| `onColor`   | `string`  | `rgba(255, 255, 255, 0.3)`  |
| `blur`      | `string`  | `4px`                       |
| `scale`     | `number`  | `77`                        |
| `highlight` | `string`  | `rgba(255, 255, 255, 0.75)` |
| `textColor` | `string`  | `#ffffff`                   |

## Documentation

The full showcase and usage examples are published at:

https://thiagopac.github.io/angular-liquid-glass-docs/

The docs app includes component pages for:

- card
- button
- dropdown
- accordion
- icons
- nav
- spinner
- toggle

## Local Development

Install dependencies and run the normal verification flow:

```bash
npm install
npm run lint
npm run test
npm run build
```

Useful scripts:

```bash
npm run pack:lib
npm run release:check
```

The publishable package is generated in `dist/angular-liquid-glass/`.

If you are also working on the docs app locally, the docs project can resolve the local package build from a sibling workspace and run against `dist/angular-liquid-glass`.

## Release Strategy

- `main` is the protected branch for releasable code
- semantic versioning is used
- commits follow Conventional Commits
- releases are tag-driven through GitHub Actions

Examples:

- `feat(button): add hover distortion input`
- `fix(card): clean up generated svg filters`
- `docs(readme): add quick start example`

## Contributing

External contributions are welcome. Start with:

- `CONTRIBUTING.md` for workflow, branch naming, commits, and release steps
- `CODE_OF_CONDUCT.md` for participation expectations
- `SECURITY.md` for vulnerability reporting

If you change public behavior or API shape, update docs and tests in the same pull request.

## License

MIT. See `LICENSE`.
