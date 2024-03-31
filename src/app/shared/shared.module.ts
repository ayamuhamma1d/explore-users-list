import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [NavbarComponent, FooterComponent]
})
export class SharedModule { }
