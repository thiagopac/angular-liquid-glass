import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
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
  selector: 'angular-liquid-glass-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="glass-spinner"
      [style.--spinner-size]="size()"
      [style.--spinner-blur]="blur()"
      [style.--spinner-background]="background()"
      [style.--spinner-highlight]="highlight()"
      [style.--ring-color]="ringColor()"
    >
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>
      <div class="glass-content">
        <div class="ring" [style.animation-duration]="animDuration()"></div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .glass-spinner {
      --bg-color: var(--spinner-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--spinner-highlight, rgba(255, 255, 255, 0.75));
      --color: var(--ring-color, rgba(255, 255, 255, 0.9));
      --size: var(--spinner-size, 80px);
      --thickness: calc(var(--size) * 0.075);

      position: relative;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
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
      backdrop-filter: blur(var(--spinner-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--spinner-blur, 4px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--bg-color);
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--highlight-color);
    }

    .glass-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ring {
      position: absolute;
      inset: calc(var(--size) * 0.1);
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        transparent 0%,
        color-mix(in srgb, var(--color) 15%, transparent) 20%,
        color-mix(in srgb, var(--color) 60%, transparent) 55%,
        var(--color) 80%,
        transparent 100%
      );
      mask: radial-gradient(
        farthest-side,
        transparent calc(100% - var(--thickness)),
        #000 calc(100% - var(--thickness))
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        transparent calc(100% - var(--thickness)),
        #000 calc(100% - var(--thickness))
      );
      animation: spin 1.4s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-color-scheme: dark) {
      .glass-spinner {
        --bg-color: var(--spinner-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--spinner-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassSpinnerComponent {
  readonly size = input('80px');
  readonly blur = input('4px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly ringColor = input('rgba(255, 255, 255, 0.9)');
  readonly scale = input(77);
  /** 0 (slowest) → 100 (fastest) */
  readonly speed = input(50);

  protected readonly animDuration = computed(() => {
    const s = Math.max(0, Math.min(100, this.speed()));
    return (0.2 + (100 - s) * 0.05).toFixed(2) + 's';
  });

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-spinner-filter-${nextFilterId++}`;
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
}
