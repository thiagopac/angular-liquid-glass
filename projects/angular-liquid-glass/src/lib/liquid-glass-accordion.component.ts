import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { LiquidGlassFilterService } from './liquid-glass-filter.service';

let nextFilterId = 0;

@Component({
  selector: 'angular-liquid-glass-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="accordion"
      [class.open]="isOpen()"
      [style.--acc-blur]="blur()"
      [style.--acc-background]="background()"
      [style.--acc-highlight]="highlight()"
      [style.--acc-text]="textColor()"
      [style.--acc-radius]="borderRadius()"
    >
      <!-- Single glass surface for the whole panel -->
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>

      <!-- Header — always visible -->
      <div class="acc-header" (click)="toggle()">
        <span>{{ label() }}</span>
        <svg
          class="acc-arrow"
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

      <!-- Separator line -->
      <div class="acc-separator"></div>

      <!-- Collapsible body -->
      <div class="acc-body" [class.open]="isOpen()">
        <div class="acc-body-inner">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      font-family: inherit;
    }

    /* ── Outer panel (ONE glass surface) ── */

    .accordion {
      --bg-color: var(--acc-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--acc-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--acc-text, #ffffff);

      position: relative;
      border-radius: var(--acc-radius, 12px);
      overflow: hidden;
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
      backdrop-filter: blur(var(--acc-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--acc-blur, 4px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--bg-color);
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--highlight-color);
    }

    /* ── Header ── */

    .acc-header {
      position: relative;
      z-index: 4;
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      color: var(--text-color);
      font-weight: 500;
      cursor: pointer;
      user-select: none;
    }

    .acc-arrow {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: 0.7;
      transition: transform 0.35s ease;
    }

    .acc-arrow.open {
      transform: rotate(180deg);
    }

    /* ── Separator ── */

    .acc-separator {
      position: relative;
      z-index: 4;
      height: 1px;
      margin: 0 16px;
      background: rgba(255, 255, 255, 0.15);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    .accordion.open .acc-separator {
      transform: scaleX(1);
    }

    /* ── Collapsible body ── */

    .acc-body {
      position: relative;
      z-index: 4;
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease;
    }

    .acc-body.open {
      grid-template-rows: 1fr;
    }

    .acc-body-inner {
      overflow: hidden;
      color: var(--text-color);
      font-size: 0.925rem;
      line-height: 1.6;
      padding: 0 16px;
      transition: padding 0.35s ease;
      opacity: 0.85;
    }

    .acc-body.open .acc-body-inner {
      padding: 14px 16px;
    }

    @media (prefers-color-scheme: dark) {
      .accordion {
        --bg-color: var(--acc-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--acc-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassAccordionComponent {
  readonly label = input.required<string>();
  readonly blur = input('4px');
  readonly borderRadius = input('12px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);

  protected readonly isOpen = signal(false);

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-accordion-filter-${nextFilterId++}`;
  private readonly filterService = inject(LiquidGlassFilterService);
  private cleanupFilter?: () => void;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      this.filterService.setScale(this.filterId, this.scale());
    });

    afterNextRender(() => {
      this.cleanupFilter = this.filterService.create(this.filterId, this.scale());
      if (this.glassFilterEl) {
        this.glassFilterEl.nativeElement.style.filter = `url(#${this.filterId}) saturate(120%) brightness(1.15)`;
      }
    });

    destroyRef.onDestroy(() => this.cleanupFilter?.());
  }

  protected toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
