import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl=`${environment.apiUrl}/usuarios/`;
    httpClient=inject(HttpClient);
  
   getAllUsers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl);
  }
}
