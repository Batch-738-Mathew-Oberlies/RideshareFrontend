import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyRidesComponent } from './view-my-rides.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('ViewMyRidesComponent', () => {
  let component: ViewMyRidesComponent;
  let fixture: ComponentFixture<ViewMyRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyRidesComponent ],
      imports: [HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}]
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

  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }
});
