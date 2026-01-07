import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  userName: string;
  password: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${id}`);
  }
}
