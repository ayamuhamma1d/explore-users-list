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
  searchTerm: string = "";
  errorMessage: string = "";
  isPrevActive: boolean = false;
  isNextActive: boolean = true;

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
        this.updateArrowStatus();
      } else if (window.location.pathname === '/user-list') {
        this.currentPage = 1;
        this.pageChange(this.currentPage);
        this.getAllUsers();

        this.updateArrowStatus();
      } else {
        this.getAllUsers();
      }
    });
  }


  getAllUsers(): void {
    this.isLoading = true;
    this._userService.getUsers(this.currentPage).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.allUsers = res.data;
        this.totalPages = res.total;
        this.isLoading = false;
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error("Error fetching users:", err);
        this.errorMessage = "Error fetching users";
        this.isLoading = false;
      }
    });
  }

  pageChange(event: any, page?: number): void {
    this.currentPage = event.pageIndex + 1;
    this._router.navigate([], { queryParams: { page: this.currentPage } });
    this.updateArrowStatus();

    if (page) {
      this.currentPage = 1;
      this.getAllUsers();
      this.updateArrowStatus();
    } else {
      this.getAllUsers();
      this.updateArrowStatus();
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
              this.errorMessage = "";
            } else {
              this.allUsers = [];
              this.errorMessage = "User not found";
            }
            this.isLoading = false;
            window.scrollTo(0, 0);
          },
          error: (err) => {
            console.error("Error fetching user:", err);
            this.errorMessage = "Invalid user ID";
            this.isLoading = false;
          }
        });
      } else {
        this.errorMessage = "Invalid user ID";
        this.havePagination = false;
      }
    } else {
      this.havePagination = true;
      this.errorMessage = "";
      this.getAllUsers();
    }
  }



  updateArrowStatus(): void {
    this.isPrevActive = this.currentPage > 1;
    this.isNextActive = this.currentPage < this.totalPages;
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this._router.navigate([], { queryParams: { page: this.currentPage } });
      this.getAllUsers();

      this.updateArrowStatus();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this._router.navigate([], { queryParams: { page: this.currentPage } });
      this.getAllUsers();
      this.updateArrowStatus();
    }
  }

}
