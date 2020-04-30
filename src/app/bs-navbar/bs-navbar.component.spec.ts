import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsNavbarComponent } from './bs-navbar.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent ],
      imports: [RouterModule, RouterTestingModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
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
