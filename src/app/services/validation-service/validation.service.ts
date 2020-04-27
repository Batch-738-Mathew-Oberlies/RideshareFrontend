import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   /**
    * The contructor for the validation service.
	*/
  constructor() { }
  
   /** 
  * Validates the number of seats of the car. The number of seats must be
  * an integer between 1 and 6 inclusive. We can assume this means a 7 seat
  * vehicle minus the driver.
  * @function
  * @returns {boolean}
  */
  validateSeats(seats: number) {
    return seats > 0 && seats <= 6 && seats % 1 === 0;
  }


  /**
   * Checks for special characters in the username and validates the length.
   * Usernames cannot be longer than 12 characters, less than 3 characters, or
   * contain special characters.
  */
  validateUserName(userName: string) {
		return /^\w+\.?\w+$/.test(userName) && userName.length >= 3 && userName.length <= 12;
	}

  /**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 * First and last names cannot be longer than 29 characters.
	 */
	validateName(name: string) {
		return /^[a-zA-Z\u00C0-\u017F]+[- ]?[a-zA-Z\u00C0-\u017F]+$/.test(name) && name.length < 30;
	}

  /**
	 * Checks the email that the user entered.
	 * Emails must be formatted like one.
	 */
	validateEmail(email: string) {
		return /^\w+\.?\w+@\w+\.[a-zA-Z]{2,4}$/.test(email);
	}

  /**
	 * Validates the phone number.
	 * Phone numbers must be formatted like one.
	 */
	validatePhone(phone: string) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }
  
  /**
	 * This function formats the name string automatically, capitalizing any letters
	 * following spaces or hyphens.
	 */
	nameFormat(name: string) {

		let newName: string = "";
		
		newName += name[0].toUpperCase();

		for (let i = 1; i < name.length; i++) {
			if (name.charAt(i) === " " || name.charAt(i) === "-") {
				newName += name[i];
				newName += name[i+1].toUpperCase();
				i++;
			} else {
				newName += name[i].toLowerCase();
			}
		}

		return newName;
	}

  /**
	 * This function formats the phone number, automatically adding the hyphens.
	 */
	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}
  
}
