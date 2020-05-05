import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationComponent } from './profile-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileLocationComponent', () => {
  let component: ProfileLocationComponent;
  let fixture: ComponentFixture<ProfileLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLocationComponent ],
      imports: [ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule ],
      providers: [{provide: Router, useClass: RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sessionStorage.setItem("userid", '3');

    fixture = TestBed.createComponent(ProfileLocationComponent);
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
