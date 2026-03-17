import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  InjectionToken,
} from '@angular/core';
import { LiquidGlassFilterService } from './liquid-glass-filter.service';

export const GLASS_DROPDOWN_FILTER_ID = new InjectionToken<string>('GLASS_DROPDOWN_FILTER_ID');

let nextFilterId = 0;

@Component({
  selector: 'angular-liquid-glass-dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: GLASS_DROPDOWN_FILTER_ID,
      useFactory: () => `alg-dropdown-filter-${nextFilterId++}`,
    },
  ],
  template: `
    <div
      class="glass-dropdown-list"
      [style.--dropdown-blur]="blur()"
      [style.--dropdown-bg]="background()"
      [style.--dropdown-highlight]="highlight()"
      [style.--dropdown-text]="textColor()"
      [style.--dropdown-radius]="borderRadius()"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: block;
      font-family: inherit;
    }

    .glass-dropdown-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
  `,
})
export class LiquidGlassDropdownComponent {
  readonly blur = input('4px');
  readonly borderRadius = input('12px');
  readonly background = input('rgba(255, 255, 255, 0.01)');
  readonly highlight = input('rgba(255, 255, 255, 0.75)');
  readonly textColor = input('#ffffff');
  readonly scale = input(77);

  private readonly filterId = inject(GLASS_DROPDOWN_FILTER_ID);
  private readonly filterService = inject(LiquidGlassFilterService);
  private cleanupFilter?: () => void;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      this.filterService.setScale(this.filterId, this.scale());
    });

    afterNextRender(() => {
      this.cleanupFilter = this.filterService.create(this.filterId, this.scale());
    });

    destroyRef.onDestroy(() => this.cleanupFilter?.());
  }
}
