import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrimesService {
  // http://localhost/web/presense/api/crimes/notify
  private API_URL = 'http://localhost/web/presense/api/crimes/';

  constructor(
    private http: HttpClient
  ) { }
  getNotify(): Observable<any> {
    return this.http.get(this.API_URL + 'notify');
  }
}
