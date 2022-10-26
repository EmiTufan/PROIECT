import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogin(){
    return !!localStorage.getItem('authToken')
  }
  getToken(){
    return localStorage.getItem('authToken')
  }
}
