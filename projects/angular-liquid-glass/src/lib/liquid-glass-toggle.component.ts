import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  ViewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { LiquidGlassFilterService } from './liquid-glass-filter.service';

let nextFilterId = 0;

@Component({
  selector: 'angular-liquid-glass-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      class="glass-toggle"
      [style.--toggle-blur]="blur()"
      [style.--toggle-background]="background()"
      [style.--toggle-on-color]="onColor()"
      [style.--toggle-off-color]="offColor()"
      [style.--toggle-highlight]="highlight()"
      [style.--toggle-text]="textColor()"
    >
      <input
        type="checkbox"
        class="toggle-input"
        [checked]="checked()"
        (change)="onChange($event)"
      />
      <div class="toggle-track" [class.is-checked]="checked()">
        <div class="glass-filter" #trackFilter></div>
        <div class="glass-overlay"></div>
        <div class="glass-specular"></div>
        <div class="toggle-thumb">
          <div class="glass-filter" #thumbFilter></div>
          <div class="glass-overlay"></div>
          <div class="glass-specular"></div>
        </div>
      </div>
      @if (label()) {
        <span class="toggle-label">{{ label() }}</span>
      }
    </label>
  `,
  styles: `
    :host {
      display: inline-block;
      font-family: inherit;
    }

    .glass-toggle {
      --bg-color: var(--toggle-background, rgba(255, 255, 255, 0.01));
      --color-off: var(--toggle-off-color, rgba(255, 255, 255, 0.08));
      --color-on: var(--toggle-on-color, rgba(255, 255, 255, 0.3));
      --highlight-color: var(--toggle-highlight, rgba(255, 255, 255, 0.75));
      --text-color: var(--toggle-text, #ffffff);
      --track-w: 52px;
      --track-h: 28px;
      --thumb-d: 22px;
      --travel: calc(var(--track-w) - var(--thumb-d) - 6px);

      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    /* ── Hidden checkbox ── */

    .toggle-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    /* ── Track ── */

    .toggle-track {
      position: relative;
      flex-shrink: 0;
      width: var(--track-w);
      height: var(--track-h);
      border-radius: calc(var(--track-h) / 2);
      overflow: hidden;
      transition: filter 0.2s ease;
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
      backdrop-filter: blur(var(--toggle-blur, 4px)) saturate(180%);
      -webkit-backdrop-filter: blur(var(--toggle-blur, 4px)) saturate(180%);
    }

    .glass-overlay {
      z-index: 2;
      background: var(--color-off);
      transition: background 0.25s ease;
    }

    .glass-specular {
      z-index: 3;
      box-shadow: inset 1px 1px 1px var(--highlight-color);
    }

    .toggle-track.is-checked > .glass-overlay {
      background: var(--color-on);
    }

    .glass-toggle:hover .toggle-track:not(.is-checked) > .glass-overlay {
      background: color-mix(in srgb, var(--color-off) 60%, rgba(255, 255, 255, 0.15));
    }

    /* ── Thumb ── */

    .toggle-thumb {
      position: absolute;
      z-index: 4;
      top: 3px;
      left: 3px;
      width: var(--thumb-d);
      height: var(--thumb-d);
      border-radius: 50%;
      overflow: hidden;
      transform: translateX(0);
      transition: transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    .toggle-track.is-checked .toggle-thumb {
      transform: translateX(var(--travel));
    }

    /* Thumb glass layers override */
    .toggle-thumb .glass-filter {
      backdrop-filter: blur(2px) saturate(160%);
      -webkit-backdrop-filter: blur(2px) saturate(160%);
    }

    .toggle-thumb .glass-overlay {
      background: rgba(255, 255, 255, 0.88);
      transition: none;
    }

    .toggle-thumb .glass-specular {
      box-shadow:
        inset 1px 1px 1px rgba(255, 255, 255, 1),
        0 2px 6px rgba(0, 0, 0, 0.2);
    }

    /* ── Label ── */

    .toggle-label {
      color: var(--text-color);
      font-size: 15px;
      font-weight: 500;
      user-select: none;
      line-height: 1;
    }

    /* ── Focus ── */

    .toggle-input:focus-visible + .toggle-track {
      outline: 2px solid rgba(255, 255, 255, 0.5);
      outline-offset: 2px;
    }

    @media (prefers-color-scheme: dark) {
      .glass-toggle {
        --bg-color: var(--toggle-background, rgba(0, 0, 0, 0.01));
        --highlight-color: var(--toggle-highlight, rgba(255, 255, 255, 0.15));
      }
    }
  `,
})
export class LiquidGlassToggleComponent {
  readonly label = input('');
  readonly blur = input('4px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly offColor = input('rgba(255, 255, 255, 0.08)');
  readonly onColor = input('rgba(255, 255, 255, 0.3)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);
  readonly checked = model(false);

  @ViewChild('trackFilter') private readonly trackFilterEl?: ElementRef<HTMLDivElement>;
  @ViewChild('thumbFilter') private readonly thumbFilterEl?: ElementRef<HTMLDivElement>;

  private readonly filterId = `alg-toggle-filter-${nextFilterId++}`;
  private readonly filterService = inject(LiquidGlassFilterService);
  private cleanupFilter?: () => void;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      this.filterService.setScale(this.filterId, this.scale());
    });

    afterNextRender(() => {
      this.cleanupFilter = this.filterService.create(this.filterId, this.scale());
      const filterStr = `url(#${this.filterId}) saturate(120%) brightness(1.15)`;
      if (this.trackFilterEl) this.trackFilterEl.nativeElement.style.filter = filterStr;
      if (this.thumbFilterEl) this.thumbFilterEl.nativeElement.style.filter = filterStr;
    });

    destroyRef.onDestroy(() => this.cleanupFilter?.());
  }

  protected onChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
  }
}
