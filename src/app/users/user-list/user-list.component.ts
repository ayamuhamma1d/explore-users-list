import { Users } from 'src/app/interface/users';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users.service';

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

  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true; 
    this._userService.getUsers(this.currentPage).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.allUsers = res.data;
        this.totalPages = res.total;
        this.isLoading = false; 
      },
      error: (err) => {
        console.error("Error fetching users:", err);
        this.errorMessage = "Error fetching users";
        this.isLoading = false;
      }
    });
  }

  pageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.getAllUsers();
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
}
