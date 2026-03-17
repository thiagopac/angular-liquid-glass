# Angular Liquid Glass

`angular-liquid-glass` provides standalone Angular components with a liquid glass visual language.

## Install

```bash
npm install angular-liquid-glass
```

## Example

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

## Components

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

## Repository

Project docs, contribution guide, and release process live in the repository README:
https://github.com/thiagopac/angular-liquid-glass
