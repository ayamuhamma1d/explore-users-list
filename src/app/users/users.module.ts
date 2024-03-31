import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FormsModule } from '@angular/forms';

// component
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [UserListComponent,UserCardComponent,UserDetailsComponent],
  imports: [
    CommonModule,MatIconModule,
    UsersRoutingModule,UsersRoutingModule,FormsModule,MatProgressSpinnerModule,MatPaginatorModule
  ],
  exports: [
    UserListComponent,UserCardComponent,UserDetailsComponent
  ]
})
export class UsersModule { }
