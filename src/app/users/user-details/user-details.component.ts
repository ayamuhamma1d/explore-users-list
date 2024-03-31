import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/interface/users';
import { UsersService } from 'src/core/services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userData: Users | null = null;
  isLoading: boolean = false;
  previousPage: number = 1;

  constructor(
    private _userService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _router: Router
  ) {}

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.previousPage = params['page'] || 1;
    });

    this._activatedRoute.params.subscribe(params => {
      const userId = +params['id'];
      this.previousPage = userId >= 7 ? 2 : 1;
      this.getUserDetails(userId);
    });
  }

  getUserDetails(id: number): void {
    this.isLoading = true;
    this._userService.getUserById(id).subscribe({
      next: (res: any) => {
        this.userData = res.data;
        this.isLoading = false;
        window.scrollTo(0, 0);
      },
      error: (error) => {
        console.error('Error :', error);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    const previousPage = this.previousPage || 1;
    this._router.navigate(['/user-list'], { queryParams: { page: previousPage } });
  }
}
