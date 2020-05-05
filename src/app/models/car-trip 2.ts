import { Car } from './car';
import { Trip } from './trip';

export class CarTrip {

    car: Car;
    currentTrip: Trip;

    constructor(car, currentTrip){
        this.car = car;
        this.currentTrip = currentTrip;
    }
}