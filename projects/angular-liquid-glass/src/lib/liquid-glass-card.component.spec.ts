import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';

import { LiquidGlassCardComponent } from './liquid-glass-card.component';

@Component({
  standalone: true,
  imports: [LiquidGlassCardComponent],
  template: `
    <angular-liquid-glass-card width="340px" height="220px">
      <h2>Liquid Glass Card</h2>
      <p>Projected content</p>
    </angular-liquid-glass-card>
  `,
})
class TestHostComponent {}

describe('LiquidGlassCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
  });

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders projected content inside the card shell', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const card = element.querySelector('.glass-card');

    expect(card).not.toBeNull();
    expect(element.textContent).toContain('Liquid Glass Card');
    expect(element.textContent).toContain('Projected content');
  });
});
