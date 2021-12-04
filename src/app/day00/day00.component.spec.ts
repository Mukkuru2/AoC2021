import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day00Component } from './day00.component';

describe('Day00Component', () => {
  let component: Day00Component;
  let fixture: ComponentFixture<Day00Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day00Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Day00Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
