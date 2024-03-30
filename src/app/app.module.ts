import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCardComponent,
    UserDetailsComponent,
    FooterComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,MatCardModule,
    MatButtonModule,MatProgressSpinnerModule,
    MatGridListModule,MatPaginatorModule,
    HttpClientModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
