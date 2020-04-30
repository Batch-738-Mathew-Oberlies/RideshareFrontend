import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { LoginComponent } from '../login/login.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, LoginComponent, SignupModalComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [{provide: Router, useClass: RouterStub}, BsModalService, ComponentLoaderFactory, PositioningService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
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
