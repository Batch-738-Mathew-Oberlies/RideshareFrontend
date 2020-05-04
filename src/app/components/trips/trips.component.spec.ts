import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By }  from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

import { DebugElement } from '@angular/core';

import { TripsComponent, CreateTripComponent } from './trips.component';


describe('TripsComponent', () => {
  let comp: TripsComponent;
  let create: CreateTripComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let createFixture: ComponentFixture<CreateTripComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsComponent ],
      imports: [
        BrowserModule,
        FormBuilder,
        FormGroup,
      ]
    })
    .compileComponents().then(() => {fixture = TestBed.createComponent(TripsComponent);
    
    comp = fixture.componentInstance //TripComponent test instance
    create = createFixture.componentInstance //Trip Scheduler Modal 
  
    de = createFixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have this.user.driver is true`, async(() => {
    fixture = TestBed.createComponent(TripsComponent);
    comp = fixture.debugElement.componentInstance;
    expect(comp.user.driver).toBeTruthy();
  }));

  it(`should set submitted to true`, async(() => {
    create.submit();
    expect(create.submitted).toBeTruthy();
  }));

  it(`should call the submit method`, async(() => {
    createFixture.detectChanges();
    spyOn(create, 'submit');
    el = createFixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(create.submit).toHaveBeenCalledTimes(0);

  }));

  it(`should call the toggleMeridian method`, async(() => {
    create.toggleMeridian();
    expect(create.meridian).toBeFalsy();
  }));

  it(`form should be invalid`, async(() => {
    create.tripModalForm.controls['name'].setValue('');
    create.tripModalForm.controls['availableSeats'].setValue('');
    create.tripModalForm.controls['departure'].setValue('');
    create.tripModalForm.controls['street'].setValue('');
    create.tripModalForm.controls['city'].setValue('');
    create.tripModalForm.controls['state'].setValue('');
    create.tripModalForm.controls['zip'].setValue('');
    create.tripModalForm.controls['date'].setValue('');
    create.tripModalForm.controls['time'].setValue('');
    expect(create.tripModalForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    create.tripModalForm.controls['name'].setValue('ja@ja.com');
    create.tripModalForm.controls['availableSeats'].setValue('4');
    create.tripModalForm.controls['departure'].setValue('5 Carpenter Plaza, New York City, NY 10275');
    create.tripModalForm.controls['street'].setValue('37471 Stonegate Ln');
    create.tripModalForm.controls['city'].setValue('Palmdale');
    create.tripModalForm.controls['state'].setValue('CA');
    create.tripModalForm.controls['zip'].setValue('93552');
    create.tripModalForm.controls['date'].setValue('2020-05-05');
    create.tripModalForm.controls['time'].setValue('13:30:25');
    expect(create.tripModalForm.valid).toBeTruthy();
  }));

});
