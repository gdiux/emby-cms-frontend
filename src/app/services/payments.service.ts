import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ENVIRONMENT
import { environment } from '../../environments/environment';
import { Payment } from '../models/payments.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *   ADD PAYMENTS
  ==================================================================== */
  addPayments(formData:any){
    return this.http.post<{payment: Payment, ok: boolean}>(`${base_url}/payments`, formData, this.headers);
  }

  /** ================================================================
   *   GET PAYMENTS
  ==================================================================== */
  loadPayments(skip:number = 0, limit:number = 20){
    return this.http.get<{payments: Payment[], ok: boolean}>(`${base_url}/payments?skip=${skip}&limit=${limit}`, this.headers);
  }

  // FIN DE LA CLASE
}
