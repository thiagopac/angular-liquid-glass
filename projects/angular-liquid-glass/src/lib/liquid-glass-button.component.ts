import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { LiquidGlassFilterService } from './liquid-glass-filter.service';

let nextFilterId = 0;

@Component({
  selector: 'angular-liquid-glass-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="glass-button"
      [style.--btn-border-radius]="borderRadius()"
      [style.--btn-background]="background()"
      [style.--btn-highlight]="highlight()"
      [style.--btn-text]="textColor()"
      [style.--btn-blur]="blur()"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular" #glassSpecular></div>
      <button class="glass-content" type="button">
        <ng-content />
      </button>
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
      font-family: inherit;
    }

    .glass-button {
      --bg-color: var(--btn-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--btn-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--btn-text, #ffffff);

      position: relative;
      display: inline-flex;
      border-radius: var(--btn-border-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease;
      color: var(--text-color);
    }

    .glass-button:hover {
      transform: scale(1.05);
    }

    .glass-button:active {
      transform: scale(0.95);
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
      backdrop-filter: blur(var(--btn-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--btn-blur, 4px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--bg-color);
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--highlight-color);
      transition: background 0.1s ease;
    }

    .glass-content {
      position: relative;
      z-index: 4;
      padding: 12px 24px;
      background: transparent;
      border: none;
      outline: none;
      cursor: inherit;
      color: inherit;
      font: inherit;
      font-weight: 500;
      font-size: 16px;
      white-space: nowrap;
    }

    @media (prefers-color-scheme: dark) {
      .glass-button {
        --bg-color: var(--btn-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--btn-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassButtonComponent {
  readonly blur = input('4px');
  readonly borderRadius = input('12px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;
  @ViewChild('glassSpecular') private readonly glassSpecularEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-liquid-glass-btn-filter-${nextFilterId++}`;
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

  protected onMouseMove(event: MouseEvent): void {
    const specular = this.glassSpecularEl?.nativeElement;
    if (!specular) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    specular.style.background = `radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255,255,255,0.18) 0%,
      rgba(255,255,255,0.06) 40%,
      rgba(255,255,255,0) 70%
    )`;
  }

  protected onMouseLeave(): void {
    const specular = this.glassSpecularEl?.nativeElement;
    if (specular) specular.style.background = 'none';
  }
}
