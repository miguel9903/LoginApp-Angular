import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyCOoei5Z-m4W0q0XrC68hjVoHfBtm0I_Ts';
  private userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Iniciar sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  logIn(user: Usuario): any {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
           .pipe(map((response: any) => {
             this.guardarToken(response.idToken);
             return response;
           }));
  }

  register(user: Usuario): any {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData)
           .pipe(map((response: any) => {
             this.guardarToken(response.idToken);
             return response;
           }));
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  private guardarToken(idToken: string): void {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(): string {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    } else {
      const expira = Number(localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if (expiraDate >= new Date()) {
        return true;
      } else {
        return false;
      }
    }
  }
}
