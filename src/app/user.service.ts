import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly postApi =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB89sdIOfarbqHpyBkQRAnYqIHhs1Rnwwg';

  constructor(private http: HttpClient) {}

  authenticateUser(user) {
    return this.http.post(this.postApi, user);
  }
}

export interface Response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}
