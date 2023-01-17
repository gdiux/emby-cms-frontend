import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payments.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {

  constructor(  private paymentsService: PaymentsService){}

  ngOnInit(): void {
    
    // LOAD PAYMENTS
    this.loadPayments();

  }

  /** ================================================================
   *   LOAD PAYMENTS
  ==================================================================== */
  public payments: Payment[] = [];
  public paymentsTemp: Payment[] = [];
  public skip: number = 0;
  public limit: number = 20;

  loadPayments(){

    this.paymentsService.loadPayments(this.skip, this.limit)
        .subscribe( ({payments}) => {

          this.payments = payments;
          this.paymentsTemp = payments;          

        }, (err) => {
          console.log(err);          
        });

  }

  /** ================================================================
   *   SEARCH SUBSCRIPTIONS
  ==================================================================== */
  loadMore(cant: number){

    this.limit += Number(cant);
    this.loadPayments();

  }

  // FIN DE LA CLASE
}
