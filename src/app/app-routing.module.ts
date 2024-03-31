import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';
const routes: Routes = [
  {
    path: "",
    redirectTo:"user-list" ,pathMatch:"full"
  } ,
  {
    path: "user-list",
    component: UserListComponent
  } ,
   { path: 'user-details/:id', component: UserDetailsComponent }
   ,{
    path: "**",
    component: NotFoundPageComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
