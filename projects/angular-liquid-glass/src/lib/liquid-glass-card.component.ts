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
  selector: 'angular-liquid-glass-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="glass-card"
      [style.--card-width]="width()"
      [style.--card-height]="height()"
      [style.--card-border-radius]="borderRadius()"
      [style.--card-background]="background()"
      [style.--card-highlight]="highlight()"
      [style.--card-text]="textColor()"
      [style.--card-blur]="blur()"
      [style.--card-saturation]="saturation()"
    >
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-distortion-overlay"></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>

      <div class="glass-content">
        <ng-content />
      </div>
    </article>
  `,
  styles: `
    :host {
      display: inline-block;
      font-family: inherit;
    }

    .glass-card {
      --bg-color: var(--card-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--card-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--card-text, #ffffff);

      position: relative;
      width: var(--card-width, 300px);
      height: var(--card-height, 200px);
      border-radius: var(--card-border-radius, 24px);
      overflow: hidden;
      background: transparent;
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
      color: var(--text-color);
    }

    .glass-filter,
    .glass-distortion-overlay,
    .glass-overlay,
    .glass-specular {
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    .glass-filter {
      z-index: 1;
      backdrop-filter: blur(var(--card-blur, 20px)) saturate(var(--card-saturation, 180%));
      -webkit-backdrop-filter: blur(var(--card-blur, 20px)) saturate(var(--card-saturation, 180%));
    }

    .glass-distortion-overlay {
      z-index: 2;
      background:
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 80%),
        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 80%);
      background-size: 300% 300%;
      animation: float-distort 10s infinite ease-in-out;
      mix-blend-mode: overlay;
      pointer-events: none;
    }

    .glass-overlay {
      z-index: 3;
      background: var(--bg-color);
    }

    .glass-specular {
      z-index: 4;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 1px 0 0 rgba(255, 255, 255, 0.2),
        inset -1px 0 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1);
      pointer-events: none;
    }

    .glass-content {
      position: relative;
      z-index: 5;
      height: 100%;
      padding: 20px 24px;
      box-sizing: border-box;
    }

    @keyframes float-distort {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 100% 100%;
      }
      100% {
        background-position: 0% 0%;
      }
    }

    @media (prefers-color-scheme: dark) {
      .glass-card {
        --bg-color: var(--card-background, rgba(0, 0, 0, 0.22));
        --highlight-color: var(--card-highlight, rgba(255, 255, 255, 0.12));
      }
    }
  `,
})
export class LiquidGlassCardComponent {
  readonly width = input('300px');
  readonly height = input('200px');
  readonly borderRadius = input('24px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly blur = input('20px');
  readonly saturation = input('180%');
  readonly scale = input(77);

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-liquid-glass-filter-${nextFilterId++}`;
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
