import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameComponent } from './in-game.component';

describe('InGameComponent', () => {
  let component: InGameComponent;
  let fixture: ComponentFixture<InGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
