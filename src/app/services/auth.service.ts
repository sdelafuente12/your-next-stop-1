import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private usersEndpoint = `${environment.BASE_API_URL}/users`;

  constructor(private http: HttpClient) { }

  createUser(userData) {
    console.log('USERS ENVIRONMENT:', environment)
    return this.http.post(this.usersEndpoint, userData);
  }
}