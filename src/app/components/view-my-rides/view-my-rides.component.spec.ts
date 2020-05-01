import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyRidesComponent } from './view-my-rides.component';

describe('ViewMyRidesComponent', () => {
  let component: ViewMyRidesComponent;
  let fixture: ComponentFixture<ViewMyRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
