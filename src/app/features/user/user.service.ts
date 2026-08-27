import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserDTO } from '../../core/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/users';

  getUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  addUser(user: IUserDTO): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  getUserById(userId: any) {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`);
  }
  updateUser(id: any, user: IUserDTO) {
    return this.http.patch<IUser>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
