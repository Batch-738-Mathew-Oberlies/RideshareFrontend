import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('first letter of string is capitalized', () => {
    expect(service.capitalizeFirstLetter('hello')).toBe('Hello');
  })

  it('nameFormat function works as intended', () => {
    expect(service.nameFormat('logan')).toBe('Logan')
    expect(service.nameFormat('Lo gan')).toBe('Lo Gan')
    expect(service.nameFormat('Lo-gan')).toBe('Lo-Gan');
  })

  it('phoneFormat correctly hyphenates the string', () => {
    expect(service.phoneFormat('1111111111')).toBe('(111) 111-1111');
  })

  it('validateEmail correctly detects and verifies the format of an email', () => {
    expect(service.validateEmail('loganemail.com')).toBe(false);
    expect(service.validateEmail('test@test.com')).toBe(true);
  })

  it('validateName checks for non-alphabetic characters and a maximum legnth of 29 chars', () => {
    expect(service.validateName('l0gan test')).toBe(false);
    expect(service.validateName('teeeeeeeeeeeeeeeeeeeeest teeeeeeeeeeeeeeeeeeest')).toBe(false);
  })

  it('validateSeats returns true if argument passed is between 1 and 6', () => {
    expect(service.validateSeats(6)).toBe(true);
    expect(service.validateSeats(7)).toBe(false);
  })

  it('Usernames cannot be longer than 12 characters, less than 3 characters, or contain special characters.', () => {
    expect(service.validateUserName('usernameteest')).toBe(false);
    expect(service.validateUserName('hi')).toBe(false);
    expect(service.validateUserName('test#')).toBe(false);
    expect(service.validateUserName('username')).toBe(true)
  })
});
