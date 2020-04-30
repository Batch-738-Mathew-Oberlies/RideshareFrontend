<<<<<<< HEAD
import { User } from './user'
import { Address } from './address'

export class Trip{
    /**
     * Set Trip model
     */
    tripId: number
    /**
     * Set name as string
     */
    name: string
    /**
     * Set driver as a User
     */
    driver: User
    /**
     * Set riders as a User array
     */
    riders: User[]
    /**
     * Set available seats as a number
     */
    availableSeats: number
    /**
     * Set starting address
     */
    departure: Address
    /**
     * Set destination as Address
     */
    destination: Address
    /**
     * Set date and time as String from Date object
     */
    tripDate: Date
=======
import { User } from './user';
import {Address} from './address';

export class Trip 
{
    tripId: number;
    name: string;
    driver: User;
    riders: User[];
    availableSeats: number;
    departure: Address;
    destination: Address;
    tripDate: string;
>>>>>>> c7a6f49f4f6e687e23ec49bbc7afee77c673c9d2
}
