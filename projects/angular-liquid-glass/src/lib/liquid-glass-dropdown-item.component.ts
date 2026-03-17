import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { GLASS_DROPDOWN_FILTER_ID } from './liquid-glass-dropdown.component';

@Component({
  selector: 'angular-liquid-glass-dropdown-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Header -->
    <div class="dropdown-header" (click)="toggle()">
      <div class="glass-filter" #headerFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>
      <div class="glass-content">
        <span>{{ label() }}</span>
        <svg
          class="dropdown-arrow"
          [class.open]="isOpen()"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Collapsible Content -->
    <div class="dropdown-content" [class.open]="isOpen()">
      <div class="glass-filter" #contentFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>
      <div class="glass-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .glass-filter,
    .glass-overlay,
    .glass-specular {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
    }

    .glass-filter {
      z-index: 1;
      backdrop-filter: blur(var(--dropdown-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--dropdown-blur, 4px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--dropdown-bg, rgba(255, 255, 255, 0.01));
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--dropdown-highlight, rgba(255, 255, 255, 0.75));
    }

    /* ── Header ── */

    .dropdown-header {
      position: relative;
      border-radius: var(--dropdown-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      transition: filter 0.15s ease;
    }

    .dropdown-header:hover .glass-overlay {
      background: color-mix(in srgb, var(--dropdown-bg, rgba(255, 255, 255, 0.01)) 80%, white 20%);
    }

    .glass-content {
      position: relative;
      z-index: 4;
      padding: 14px 16px;
      color: var(--dropdown-text, #ffffff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .dropdown-arrow {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      transition: transform 0.3s ease;
      opacity: 0.7;
    }

    .dropdown-arrow.open {
      transform: rotate(180deg);
    }

    /* ── Collapsible Content ── */

    .dropdown-content {
      position: relative;
      border-radius: var(--dropdown-radius, 12px);
      overflow: hidden;
      max-height: 0;
      margin-top: 0;
      transition:
        max-height 0.35s ease,
        margin-top 0.35s ease,
        opacity 0.25s ease;
      opacity: 0;
    }

    .dropdown-content.open {
      max-height: 400px;
      margin-top: 8px;
      opacity: 1;
    }

    .dropdown-content .glass-content {
      padding: 14px 16px;
      display: block;
      font-size: 0.925rem;
      line-height: 1.6;
    }

    @media (prefers-color-scheme: dark) {
      .glass-overlay {
        background: var(--dropdown-bg, rgba(0, 0, 0, 0.25));
      }

      .glass-specular {
        box-shadow: inset 1px 1px 1px var(--dropdown-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassDropdownItemComponent {
  readonly label = input.required<string>();
  protected readonly isOpen = signal(false);

  @ViewChild('headerFilter') private readonly headerFilterEl?: ElementRef<HTMLDivElement>;
  @ViewChild('contentFilter') private readonly contentFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = inject(GLASS_DROPDOWN_FILTER_ID);

  constructor() {
    afterNextRender(() => {
      const filterValue = `url(#${this.filterId}) saturate(120%) brightness(1.15)`;
      if (this.headerFilterEl) {
        this.headerFilterEl.nativeElement.style.filter = filterValue;
      }
      if (this.contentFilterEl) {
        this.contentFilterEl.nativeElement.style.filter = filterValue;
      }
    });
  }

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
