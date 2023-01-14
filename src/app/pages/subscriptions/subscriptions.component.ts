import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// MODELS
import { Subscriptions } from '../../models/subscriptions.model';

// SERVICES
import { PaymentsService } from 'src/app/services/payments.service';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EmbyServersService } from 'src/app/services/emby-servers.service';
import { EmbyUsersService } from 'src/app/services/emby-users.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})

export class SubscriptionsComponent implements OnInit {

  constructor(  private subscriptionsService: SubscriptionsService,
                private paymentsService: PaymentsService,
                private embyUsersService: EmbyUsersService,
                private fb: FormBuilder){}

  ngOnInit(): void {

    // LOAD SUBSCRIPTIONS
    this.loadSubscriptions();
    
  }

  /** ================================================================
   *   LOAD SUBSCRIPTIONS
  ==================================================================== */
  public subscriptions: Subscriptions[] = [];
  public subscriptionsTemp: Subscriptions[] = [];
  
  loadSubscriptions(){

    this.subscriptionsService.getSubscriptions()
        .subscribe( ({ subscriptions }) => {          

          this.subscriptions = subscriptions;
          this.subscriptionsTemp = subscriptions;
          
          console.log(subscriptions);
          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  /** ================================================================
   *   SEARCH SUBSCRIPTIONS
  ==================================================================== */
  search(query: string){

    if (query.length < 2) {

      this.subscriptions = this.subscriptionsTemp;      
      return;
    }    

    this.subscriptionsService.searchSubscriptions(query)
        .subscribe( ({subscriptions}) => {
          
          this.subscriptions = subscriptions;

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** ================================================================
   *   ADD PAYMENTS
  ==================================================================== */
  public formSubmittedPay: boolean = false;
  public subscriberSelect: any;
  public addPaymentForm = this.fb.group({
    suid: '',
    description: ['', [Validators.required]],
    method: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1)]]
  });

  addPayment(){

    this.formSubmittedPay = true;
    this.addPaymentForm.value.suid = this.subscriberSelect.subid;

    if (this.addPaymentForm.invalid) {
      this.formSubmittedPay = false;
      return;
    }
    
    this.paymentsService.addPayments(this.addPaymentForm.value)
        .subscribe( ({payment}) => {

          this.formSubmittedPay = false;
          this.addPaymentForm.reset();

          // console.log(this.subscriberSelect);
          
          
          this.embyUsersService.updatePolicyUser(this.subscriberSelect.uid, { "IsDisabled": false }, this.subscriberSelect.server.url, this.subscriberSelect.server.apikey)
          .subscribe( resp => {

                console.log(resp);
            
            
                Swal.fire('Great', 'The payment has been saved successfully', 'success');
                
              }, (err) => {
                console.log(err);          
                Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
              }); 
          
        }, (err) => {
          console.log(err);
          this.formSubmittedPay = false;
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  validate(campo:string): boolean{

    if (this.addPaymentForm.get(campo)?.invalid && this.formSubmittedPay ) {
      return true;
    }else{
      return false;
    }

  }

  // FIN DE LA CLASE
}