import { User } from './user'
import { Car } from './car'
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
     * Set destination as Address
     */
    destination: Address
    /**
     * Set date and time as String from Date object
     */
    date: string
}
