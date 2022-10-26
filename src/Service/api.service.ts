import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'environments';
import { HttpClient } from '@angular/common/http';
import { MODEL } from 'src/models/model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiURL;

  constructor(private http:HttpClient) { }

  getAllData(): Observable<MODEL[]>{
    return this.http.get<MODEL[]>(`${this.baseUrl}`)
  }

  getByid(id:string): Observable<MODEL[]>{
    return this.http.get<MODEL[]>(`${this.baseUrl}`)
  }
  
  getByEmail(data:any){
    return this.http.post(`${this.baseUrl}/checkemail`, data)
  }
  createUser(data:any){
    return this.http.post(`${this.baseUrl}/createUser`, data)
  }

  verifyEmailToken(data:any){
    return this.http.get(`${this.baseUrl}/verify-token/${data}`)
  }

}