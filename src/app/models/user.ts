import { Batch } from './batch';
import { Address } from './address';

/**
 * A model representing the User class.
 */
export class User {
    /**
     * Set User model
     */
    userId: number;

    /**
     * Set username as a string
     */
    userName: string;

    /**
     * Batch a User belongs to
     */
    batch: Batch = new Batch();

    /**
     * Set first name as a string
     */
    firstName: string;

    /**
     * Set last name as a string
     */
    lastName: string;

    /**
     * Set email as a string
     */
    email: string;

    /**
     * Set phone number as a string
     */
    phoneNumber: string;

    /**
     * Set active as a boolean
     */
    active: boolean;

    /**
     * Set driver as a boolean
     */
    driver: boolean;
    /**
     * Set accepting ride as a boolean
     */
    acceptingRides: boolean;

    /**
     * Home Address
     */
    homeAddress: Address;

    /**
     * Work Address
     */
    workAddress: Address;
}
