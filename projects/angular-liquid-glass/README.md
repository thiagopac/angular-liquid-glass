# Angular Liquid Glass

`angular-liquid-glass` is a standalone Angular component library for liquid glass and glassmorphism interfaces.

- Live docs: https://thiagopac.github.io/angular-liquid-glass-docs/
- npm package: https://www.npmjs.com/package/angular-liquid-glass
- Repository: https://github.com/thiagopac/angular-liquid-glass

## Install

```bash
npm install angular-liquid-glass
```

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

## Available Components

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

## More Information

For full examples, contribution guides, release flow, and project status, see:

https://github.com/thiagopac/angular-liquid-glass
