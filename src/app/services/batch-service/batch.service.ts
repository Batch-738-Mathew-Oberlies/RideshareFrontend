import { Injectable } from '@angular/core';
import { Batch } from 'src/app/models/batch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/**
 * This is the batch service
 */
export class BatchService {

	url: string = environment.batchesUri;
	
	/**
	 * Initializes all the batches in an array called Batch[].
	 */
	batches: Batch[] = [
		{batchNumber: 1, batchLocation: 'VWU - Morgantown, WV'},
		{batchNumber: 2, batchLocation: 'UTA - Arlington, TX'},
		{batchNumber: 3, batchLocation: 'USF - Tampa, FL'},
		{batchNumber: 4, batchLocation: 'Revature HQ - Reston, VA'},
		{batchNumber: 5, batchLocation: 'CUNY SPS - New York, NY'},
		{batchNumber: 6, batchLocation: 'CUNY Queens College - Flushing, NY'}
	];
	constructor(private http: HttpClient) { }

	/**
	 * Fetches all the batches from the above array.
	 */
	getAllBatches(): Batch[] {
		return this.batches;
	}

	/**
	 * THIS METHOD REFERENCES A NON-EXISTANT ENDPOINT.
	 * @param location 
	 */
	getAllBatchesByLocation(location: string): Observable<Batch[]> {
		return this.http.get<Batch[]>(`${this.url}?location=${location}`);
	}


	/**
	 * Calls in all of the batches from the database with the default GetMapping on the
	 * BatchController.
	 */
	getAllBatchesByLocation1(): Observable<Batch[]> {
		return this.http.get<Batch[]>(`${this.url}`);
	}
}
