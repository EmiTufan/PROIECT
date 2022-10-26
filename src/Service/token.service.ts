import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   tokens:any = localStorage.getItem('authToken')

  constructor(private router : Router) { }







 saveToken(token:any){
  localStorage.setItem('authToken', token)
 }

  getTokenLocalStorage():any{
    const token = localStorage.getItem('authToken')
    return token
  }

  
  deleteToken():any{
    localStorage.removeItem('authToken')
    this.router.navigate(['login'])
  }

  verifyToken():any{
    const helper = new JwtHelperService();
    const truea = helper.isTokenExpired(this.tokens);
    return truea
  }

}
