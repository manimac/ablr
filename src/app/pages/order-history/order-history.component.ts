import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderLists: any = [];
  constructor(private http: HttpRequestService, private communication: CommunicationService, private storage: TempStorageService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    let user = this.storage.getStorage();
    let params = {
      user_id: user.id
    }
    this.http.post("/order/getOrderHistories", params).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.orderLists = response;
          console.log(this.orderLists);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
