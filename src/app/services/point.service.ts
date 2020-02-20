import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private readonly BASE_URL = 'https://localhost:44317/api/';
  constructor(private http: HttpClient) { }

  getPoints(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + 'Points');
  }
}
