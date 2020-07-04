import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  get(url){
    return this.http.get("/api/" + url);
  }

  post(url, params){
    return this.http.post("/api/" + url, params);
  }
}
