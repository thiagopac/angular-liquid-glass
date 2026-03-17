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
  selector: 'angular-liquid-glass-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="glass-icon"
      [style.--icon-blur]="blur()"
      [style.--icon-background]="background()"
      [style.--icon-highlight]="highlight()"
      [style.--icon-text]="textColor()"
      [style.--icon-radius]="borderRadius()"
      [style.--icon-size]="size()"
    >
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>
      <div class="glass-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .glass-icon {
      --bg-color: var(--icon-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--icon-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--icon-text, #ffffff);

      position: relative;
      width: var(--icon-size, 64px);
      height: var(--icon-size, 64px);
      border-radius: var(--icon-radius, 16px);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .glass-icon:hover {
      transform: scale(1.1);
    }

    .glass-icon:active {
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
      backdrop-filter: blur(var(--icon-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--icon-blur, 4px)) saturate(180%);
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
      color: var(--text-color);
    }

    .glass-content ::ng-deep svg {
      width: 55%;
      height: 55%;
      transition: transform 0.2s ease;
    }

    .glass-icon:hover .glass-content ::ng-deep svg {
      transform: scale(0.9);
    }

    @media (prefers-color-scheme: dark) {
      .glass-icon {
        --bg-color: var(--icon-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--icon-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassIconComponent {
  readonly size = input('64px');
  readonly blur = input('4px');
  readonly borderRadius = input('16px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-icon-filter-${nextFilterId++}`;
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
