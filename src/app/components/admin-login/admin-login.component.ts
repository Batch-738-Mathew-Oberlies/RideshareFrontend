import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AdminService } from 'src/app/services/admin-service/admin.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
/**
 * The admin login component.
 */
export class AdminLoginComponent implements OnInit {

  admins: Admin[] = [];

  chosenAdmin: Admin;
	userName: string = '';

	failed: boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllAdmins()
        .subscribe(allAdmins => {
          this.admins = allAdmins;
          this.chosenAdmin = this.admins[0];
      });
  }
  
  /**
   * Changes the value of chosenAdmin to the value given by the target.selectedIndex
   * field of the given event.
   * @param event 
   */
  changeAdmin(event) {
    this.chosenAdmin = this.admins[event.target.selectedIndex];
  }

  	/**
	   * Reverts the value of the userName field and sets the failed field to true in the event
	   * of a failed admin login.
	   */
	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	/**
	 * Sends a get request to the server requesting the current value of the adminId property of the
	 * chosenAdmin field, and calls loginFailed in the event of a failure.
	 */
	login() {
		this.http.get<Admin>(`${environment.adminUri}${this.chosenAdmin.adminId}`)
			.subscribe((admin: Admin) => {
				if (!admin.adminId) {
					this.loginFailed();
				} else {
					if (!this.authService.loginAsAdmin(admin, this.userName)) {
						this.loginFailed();
					}
				}
			});
	}

}
