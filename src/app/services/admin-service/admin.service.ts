import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Admin } from 'src/app/models/admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * The admin service
 */
export class AdminService {

  url: string = environment.adminUri;

  /**
   * Injects an http client.
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Performs a get request to retrieve all of the admins from the database.
   */
  getAllAdmins() {
		return this.http.get<Admin[]>(this.url);
	}
}
