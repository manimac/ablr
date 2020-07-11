import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  get(url){
    return this.http.get("/api" + url);
  }

  post(url, params){
    let detailedParams = params;
    // let detailedParams = {params: this.storage.encryptData(params)} ;
    return this.http.post("/api" + url, detailedParams);
  }
}
