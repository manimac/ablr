import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  updateProduct: EventEmitter<any>= new EventEmitter();

  constructor() { }
}
