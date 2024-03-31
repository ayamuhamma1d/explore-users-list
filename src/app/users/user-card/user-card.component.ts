import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/interface/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  constructor(private _router: Router){}
  @Input() user:Users={} as Users;
  @Input() previousPage: number = 1;

  redirectToDetails(id:number):void {

  this._router.navigate(['user-details', id])
  }

}
