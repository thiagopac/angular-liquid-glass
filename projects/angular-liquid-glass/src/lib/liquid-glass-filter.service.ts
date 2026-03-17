import { inject, Injectable, DOCUMENT } from '@angular/core';

const SVG_NS = 'http://www.w3.org/2000/svg';

@Injectable({ providedIn: 'root' })
export class LiquidGlassFilterService {
  private readonly doc = inject(DOCUMENT);

  /**
   * Creates an SVG filter in document.body and returns a cleanup function.
   * The feDisplacementMap is accessible via setScale().
   */
  create(filterId: string, initialScale = 77): () => void {
    const svg = this.doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('style', 'display:none');
    svg.setAttribute('aria-hidden', 'true');

    const filter = this.doc.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', filterId);

    const turbulence = this.doc.createElementNS(SVG_NS, 'feTurbulence');
    turbulence.setAttribute('type', 'turbulence');
    turbulence.setAttribute('baseFrequency', '0.008');
    turbulence.setAttribute('numOctaves', '2');
    turbulence.setAttribute('result', 'noise');

    const displacement = this.doc.createElementNS(SVG_NS, 'feDisplacementMap');
    displacement.setAttribute('id', `${filterId}-d`);
    displacement.setAttribute('in', 'SourceGraphic');
    displacement.setAttribute('in2', 'noise');
    displacement.setAttribute('scale', String(initialScale));

    filter.appendChild(turbulence);
    filter.appendChild(displacement);
    svg.appendChild(filter);
    this.doc.body.appendChild(svg);

    return () => svg.remove();
  }

  setScale(filterId: string, scale: number): void {
    this.doc.getElementById(`${filterId}-d`)?.setAttribute('scale', String(scale));
  }
}
