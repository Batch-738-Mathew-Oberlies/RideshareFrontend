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
     * Set car as a Car
     */
    vehicle: Car
    /**
     * Set destination as Address
     */
    destination: Address
    /**
     * Set time as String
     */
    time: Date
}
