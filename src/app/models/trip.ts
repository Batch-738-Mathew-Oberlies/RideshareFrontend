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
}
