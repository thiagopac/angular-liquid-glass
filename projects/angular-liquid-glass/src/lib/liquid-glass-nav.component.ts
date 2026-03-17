import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  InjectionToken,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import type { ElementRef, Signal, WritableSignal } from '@angular/core';
import { LiquidGlassFilterService } from './liquid-glass-filter.service';

let nextFilterId = 0;

export interface GlassNavContext {
  activeIndex: Signal<number>;
  register(): number;
  activate(index: number): void;
}

export const GLASS_NAV_CONTEXT = new InjectionToken<GlassNavContext>('GLASS_NAV_CONTEXT');

@Component({
  selector: 'angular-liquid-glass-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLASS_NAV_CONTEXT, useExisting: LiquidGlassNavComponent }],
  template: `
    <div
      class="glass-nav"
      [style.--nav-blur]="blur()"
      [style.--nav-background]="background()"
      [style.--nav-highlight]="highlight()"
      [style.--nav-text]="textColor()"
      [style.--nav-radius]="borderRadius()"
      role="tablist"
    >
      <div class="glass-filter" #glassFilter></div>
      <div class="glass-overlay"></div>
      <div class="glass-specular"></div>
      <div class="glass-items">
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      font-family: inherit;
    }

    .glass-nav {
      --bg-color: var(--nav-background, rgba(255, 255, 255, 0.01));
      --highlight-color: var(--nav-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--nav-text, #ffffff);

      position: relative;
      border-radius: var(--nav-radius, 40px);
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
      backdrop-filter: blur(var(--nav-blur, 20px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--nav-blur, 20px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--bg-color);
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--highlight-color);
    }

    .glass-items {
      position: relative;
      z-index: 4;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 8px 12px;
      gap: 4px;
      color: var(--text-color);
    }

    @media (prefers-color-scheme: dark) {
      .glass-nav {
        --bg-color: var(--nav-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--nav-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassNavComponent implements GlassNavContext {
  readonly blur = input('20px');
  readonly borderRadius = input('40px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);

  readonly activeTabChange = output<number>();

  readonly activeIndex: WritableSignal<number> = signal(0);

  @ViewChild('glassFilter') private readonly glassFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-nav-filter-${nextFilterId++}`;
  private readonly filterService = inject(LiquidGlassFilterService);
  private cleanupFilter?: () => void;
  private _nextIdx = 0;

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

  register(): number {
    return this._nextIdx++;
  }

  activate(index: number): void {
    this.activeIndex.set(index);
    this.activeTabChange.emit(index);
  }
}
