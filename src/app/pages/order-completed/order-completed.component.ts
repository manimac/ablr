import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.css']
})
export class OrderCompletedComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, private http: HttpRequestService) { }

  ngOnInit(): void {
    
  }

}
