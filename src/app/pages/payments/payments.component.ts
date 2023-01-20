import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// MODELS
import { Payment } from 'src/app/models/payments.model';
import { Subscriptions } from 'src/app/models/subscriptions.model';

// SERVICES
import { PaymentsService } from 'src/app/services/payments.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {

  constructor(  private paymentsService: PaymentsService,
                private subscriptionsService: SubscriptionsService,){}

  ngOnInit(): void {
    
    // LOAD PAYMENTS
    this.loadPayments();

  };

  /** ================================================================
   *   LOAD PAYMENTS
  ==================================================================== */
  public payments: Payment[] = [];
  public paymentsTemp: Payment[] = [];
  public skip: number = 0;
  public limit: number = 20;
  public total: number = 0;

  loadPayments(){

    this.paymentsService.loadPayments(this.skip, this.limit)
        .subscribe( ({payments}) => {

          this.payments = payments;
          this.paymentsTemp = payments;
          
          // CALCULATE TOTAL
          this.total = 0;          
          for (const payment of payments) {            
            this.total += payment.amount;
          }
          

        }, (err) => {
          console.log(err);          
        });

  };

  /** ================================================================
   *   SEARCH SUBSCRIPTIONS
  ==================================================================== */
  loadMore(cant: number){

    this.limit += Number(cant);
    this.loadPayments();

  };

  /** ================================================================
   *   SEARCH SUBSCRIPTIONS
  ==================================================================== */
  public subscriptions: Subscriptions[] = [];
  search(query: string){

    if (query.length < 2) {

      this.subscriptions = [];
      return;
    }    

    this.subscriptionsService.searchSubscriptions(query)
        .subscribe( ({subscriptions}) => {
          
          this.subscriptions = subscriptions;
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  };

  /** ================================================================
   *   LOAD PAYMENTS FOR USER
  ==================================================================== */
  @ViewChild('query') query!: ElementRef;
  
  paymentsSubscriber( subscriber: string ){    

    this.paymentsService.loadQueryPayments(0, 50, {subid: subscriber})
        .subscribe( ({payments}) => {

          this.payments = payments;

          if (payments.length > 0) {
            this.query.nativeElement.value = '';
            this.query.nativeElement.onFocus = true;
            this.subscriptions = [];
          }

          // CALCULATE TOTAL
          this.total = 0;          
          for (const payment of payments) {            
            this.total += payment.amount;
          }
          
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });
        
  };
      
  /** ================================================================
   *   LOAD PAYMENTS FOR DATES
  ==================================================================== */
  paymentsDate(init: any, end: any){

    // this.query.query.price = { $gte: desde, $lt: (hasta + 1) };
    let dates =  {  $and: [{ fecha: { $gte: new Date(init), $lt: new Date(end) } }] };

    this.paymentsService.loadQueryPayments(0, 50, dates)
        .subscribe( ({payments}) => {

          this.payments = payments;
          
          // CALCULATE TOTAL
          this.total = 0;          
          for (const payment of payments) {            
            this.total += payment.amount;
          }
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });
    

  }
  
  // FIN DE LA CLASE
}
    