import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurluser: string = environment.basePathUser;
  constructor(private http: HttpClient) { }

    adduser(user: User) {
    return this.http.post<User>(this. baseurluser, user);
  }

}
