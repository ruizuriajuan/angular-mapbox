import { Injectable, inject } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;
  private http = inject(HttpClient);

  constructor() { }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => console.log('Aquiiii', user)),
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id))
      )
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user), //existe el obj usuario?
        catchError(error => of(false))
      )
  }
}

