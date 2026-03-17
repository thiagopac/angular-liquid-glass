import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'angular-liquid-glass-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="glass-divider"
      [class.vertical]="orientation() === 'vertical'"
      [style.--divider-color]="color()"
    ></div>
  `,
  styles: `
    :host {
      display: block;
    }

    :host([orientation='vertical']) {
      display: flex;
      align-self: stretch;
    }

    .glass-divider {
      background: var(--divider-color, rgba(255, 255, 255, 0.15));
      border-radius: 1px;
      flex-shrink: 0;
    }

    .glass-divider:not(.vertical) {
      width: 100%;
      height: 1px;
    }

    .glass-divider.vertical {
      width: 1px;
      height: 100%;
      align-self: stretch;
    }
  `,
})
export class LiquidGlassDividerComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly color = input('rgba(255, 255, 255, 0.15)');
}
