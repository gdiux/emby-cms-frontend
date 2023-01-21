import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payments.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(  private paymentsService: PaymentsService){ }

  ngOnInit(): void {
    
    this.loadPayments();

  }

  /** ================================================================
   *   LOAD PAYMENTS
  ==================================================================== */
  public payments: Payment[] = [];

  loadPayments(){

    this.paymentsService.loadPayments(0, 20)
        .subscribe( ({payments}) => {

          this.payments = payments;          

        }, (err) => {
          console.log(err);          
        });

  };

  // FIN DE LA CLASE
}
