# Angular Liquid Glass

`angular-liquid-glass` is a standalone Angular component library for liquid glass and glassmorphism interfaces. It is designed for Angular applications that want expressive translucent UI primitives without depending on custom design-system infrastructure first.

- Live docs: https://thiagopac.github.io/angular-liquid-glass-docs/
- npm package: https://www.npmjs.com/package/angular-liquid-glass
- Docs repo: https://github.com/thiagopac/angular-liquid-glass-docs

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
import {
  LiquidGlassButtonComponent,
  LiquidGlassCardComponent,
} from 'angular-liquid-glass';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [LiquidGlassCardComponent, LiquidGlassButtonComponent],
  template: `
    <angular-liquid-glass-card width="320px" height="220px">
      <h2>Angular Liquid Glass</h2>
      <p>Standalone glassmorphism components for Angular.</p>
      <angular-liquid-glass-button>
        Explore
      </angular-liquid-glass-button>
    </angular-liquid-glass-card>
  `,
})
export class DemoComponent {}
```

## Package API

The current public entrypoint exports:

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
  LiquidGlassCardComponent,
  LiquidGlassSpinnerComponent,
} from 'angular-liquid-glass';
```

## Example Patterns

### Card

```html
<angular-liquid-glass-card width="320px" height="280px">
  <h2>Liquid Glass Card</h2>
  <p>Content is projected into the card body.</p>
</angular-liquid-glass-card>
```

### Button

```html
<angular-liquid-glass-button>
  Continue
</angular-liquid-glass-button>
```

### Accordion

```html
<angular-liquid-glass-accordion label="What is this?">
  <p>A standalone glass accordion with animated open and close behavior.</p>
</angular-liquid-glass-accordion>
```

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
