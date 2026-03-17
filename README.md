# Angular Liquid Glass

`angular-liquid-glass` is an Angular 21 component library focused on liquid glass and glassmorphism UI primitives built with standalone components.

## Status

The project is public-ready but still pre-`1.0.0`. The API is usable, but small breaking changes may happen while the component set stabilizes.

Current exported building blocks:

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

## Installation

```bash
npm install angular-liquid-glass
```

Peer dependencies expected in the host app:

- Angular `^21.2.0`
- RxJS `^7.8.0`

## Angular Usage

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

## Package Consumption

Import only the components you need from the package entrypoint:

```ts
import {
  LiquidGlassAccordionComponent,
  LiquidGlassCardComponent,
  LiquidGlassSpinnerComponent,
} from 'angular-liquid-glass';
```

## Main Scripts

```bash
npm run lint
npm run test
npm run build
npm run pack:lib
npm run release:check
```

## Local Development

```bash
npm install
npm run lint
npm run test
npm run build
```

The packaged library output is generated in `dist/angular-liquid-glass/`.

## Project Conventions

- `main` is the protected branch for releasable code.
- Branch names should follow `feat/...`, `fix/...`, `docs/...`, or `chore/...`.
- Commits follow Conventional Commits.
- Releases are tag-driven with semantic versioning.

## Contributing

Contributions are welcome. See `CONTRIBUTING.md` for branch naming, commit rules, local validation, and release flow.

## License

MIT. See `LICENSE`.
