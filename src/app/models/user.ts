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
     * Attached a batch object
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
    isDriver: boolean;

    driver: boolean;

    /**
     * Set accepting ride as a boolean
     */
    isAcceptingRides: boolean;

    /**
     * Home Address
     */
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6efa67e170aecc4f080f4b051018d87bee36ee90
    haddress: Address;

    /**
     * Work Address
     */
    waddress: Address;
}
<<<<<<< HEAD
=======
    hAddress: Address;
    
    /**
     * Work Address
     */
    wAddress: Address;
}
>>>>>>> c7a6f49f4f6e687e23ec49bbc7afee77c673c9d2
=======
>>>>>>> 6efa67e170aecc4f080f4b051018d87bee36ee90
