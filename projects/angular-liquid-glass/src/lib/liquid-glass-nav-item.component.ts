import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { Signal } from '@angular/core';
import { GLASS_NAV_CONTEXT } from './liquid-glass-nav.component';
import type { GlassNavContext } from './liquid-glass-nav.component';

@Component({
  selector: 'angular-liquid-glass-nav-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="nav-item"
      [class.active]="isActive()"
      (click)="activate()"
      type="button"
      role="tab"
      [attr.aria-selected]="isActive()"
    >
      <span class="nav-icon">
        <ng-content />
      </span>
      <span class="nav-label">{{ label() }}</span>
    </button>
  `,
  styles: `
    :host {
      display: contents;
      font-family: inherit;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      flex: 1;
      min-width: 56px;
      padding: 6px 8px;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: inherit;
      font: inherit;
      border-radius: var(--nav-radius, 40px);
      transition:
        opacity 0.2s ease,
        transform 0.15s ease;
      opacity: 0.5;
      position: relative;
    }

    .nav-item::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--nav-radius, 40px);
      background: rgba(255, 255, 255, 0);
      transition: background 0.2s ease;
    }

    .nav-item.active {
      opacity: 1;
    }

    .nav-item.active::before {
      background: rgba(255, 255, 255, 0.15);
    }

    .nav-item:active {
      transform: scale(0.92);
    }

    .nav-icon {
      position: relative;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-icon ::ng-deep svg {
      width: 24px;
      height: 24px;
      transition: transform 0.2s ease;
    }

    .nav-item.active .nav-icon ::ng-deep svg {
      transform: scale(1.1);
    }

    .nav-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.01em;
      white-space: nowrap;
      line-height: 1;
    }

    @media (prefers-color-scheme: dark) {
      .nav-item.active::before {
        background: rgba(255, 255, 255, 0.12);
      }
    }
  `,
})
export class LiquidGlassNavItemComponent {
  readonly label = input.required<string>();

  private readonly ctx: GlassNavContext = inject(GLASS_NAV_CONTEXT);
  protected readonly itemIndex: number;
  protected readonly isActive: Signal<boolean>;

  constructor() {
    this.itemIndex = this.ctx.register();
    this.isActive = computed(() => this.ctx.activeIndex() === this.itemIndex);
  }

  protected activate(): void {
    this.ctx.activate(this.itemIndex);
  }
}
