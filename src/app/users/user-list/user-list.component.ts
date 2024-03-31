import { Users } from 'src/app/interface/users';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  allUsers: Users[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading: boolean = false;
  havePagination: boolean = true;
  searchTerm: string = '';
  errorMessage: string = '';

  pages: number[] = [];
  isActive(page: number): boolean {
    return page === this.currentPage;
  }
  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const page = params['page'];
      if (page) {
        this.currentPage = +page;
        this.getAllUsers();

      } else if (window.location.pathname === '/user-list') {
        this.currentPage = 1;
        this.getAllUsers();

      } else {
        this.getAllUsers();
      }
    });
  }

  getAllUsers(): void {
    this.isLoading = true;
    this._userService.getUsers(this.currentPage).subscribe({
      next: (res: any) => {
        this.allUsers = res.data;
        this.totalPages = 2;
        this.isLoading = false;
        window.scrollTo(0, 0);
        this.generatePageNumbers();
      },
      error: err => {
        console.error('Error fetching users:', err);
        this.errorMessage = 'Error fetching users';
        this.isLoading = false;
      }
    });
  }

  generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this._router.navigate([], { queryParams: { page: this.currentPage } });
      this.getAllUsers();

    }
  }
  search(): void {
    if (this.searchTerm) {
      const userId = parseInt(this.searchTerm);
      if (!isNaN(userId)) {
        this.havePagination = false;
        this.isLoading = true;
        this._userService.getUserById(userId).subscribe({
          next: (res: any) => {
            if (res.data) {
              this.allUsers = [res.data];
              this.errorMessage = '';
            } else {
              this.allUsers = [];
              this.errorMessage = 'User not found';
            }
            this.isLoading = false;
            window.scrollTo(0, 0);
          },
          error: err => {
            console.error('Error fetching user:', err);
            this.errorMessage = 'Invalid user ID';
            this.isLoading = false;
          }
        });
      } else {
        this.errorMessage = 'Invalid user ID';
        this.havePagination = false;
      }
    } else {
      this.havePagination = true;
      this.errorMessage = '';
      this.getAllUsers();
    }
  }


}
