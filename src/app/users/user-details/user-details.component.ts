import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/interface/users';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userData: Users | null = null;

  constructor(private _userService: UsersService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const userId = +params['id']; 
      this.getUserDetails(userId);
    });
  }

  getUserDetails(id: number): void {
    this._userService.getUserById(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.userData = res.data; 
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
  
      }
    });
  }
}



