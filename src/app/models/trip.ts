import { User } from './user';
import { Address } from './address';

export enum TripStatus {
  PAST,
  CURRENT,
  FUTURE
}

export class Trip
{
    tripId: number;
    name: string;
    driver: User;
    riders: User[];
    availableSeats: number;
    departure: Address;
    destination: Address;
    tripDate: Date;
    tripStatus: TripStatus;
}
