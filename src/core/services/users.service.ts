import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://reqres.in/api/users';
  constructor(private _httpClient: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/${id}`);
  }
  
}
