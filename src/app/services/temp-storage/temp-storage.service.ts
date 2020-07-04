import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TempStorageService {

  constructor(private router: Router, private storageService: StorageService) { }

  setStorage(params){
    // localStorage.setItem('ablrUser', JSON.stringify(params));
    this.storageService.secureStorage.setItem('ablrUser', JSON.stringify(params));
  }

  getStorage(){
    let resultData = null;
    // let data = localStorage.getItem('ablrUser');
    let data = this.storageService.secureStorage.getItem('ablrUser');
    if(data){
      resultData = JSON.parse(data);
    }
    return resultData;
  }

  clearStorage(){
    // localStorage.removeItem('ablrUser');
    this.storageService.secureStorage.clear('ablrUser');
    this.router.navigate(['/signin']);
  }

  setProductStorage(params){
    // localStorage.setItem('products', JSON.stringify(params));
    this.storageService.secureStorage.setItem('products', JSON.stringify(params));
  }

  getProductStorage(){
    let resultData = null;
    // let data = localStorage.getItem('products');
    let data = this.storageService.secureStorage.getItem('products');
    if(data){
      resultData = JSON.parse(data);
    }
    return resultData;
  }

  clearProductStorage(){
    // localStorage.removeItem('products');
    this.storageService.secureStorage.clear('products');
    this.router.navigate(['/signin']);
  }
}
