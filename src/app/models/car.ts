import { User } from './user';

/**
 * A model representing the Car class.
 */
export class Car {
    /**
     * Set Car model
     */
    carId: number;
    /**
     * Set color as a string 
     */
    color: string;
    /**
     * Set seat as a number
     */
    seats: number;
    /**
     * Set availableSeats as a number
     */
    availableSeats: number;
    /**
     * Set make as a string
     */
    make: string;
    /**
     * Set model as a string
     */
    model: string;
    /**
     * Set year as a number
     */
    year: number;
    /**
     * Attached a user object
     */
    user: User = new User();
}