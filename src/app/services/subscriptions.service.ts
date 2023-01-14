import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// MODELS
import { Subscriptions } from '../models/subscriptions.model';

// ENVIRONMENT
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

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
   *   GET SUBSCRIPTIONS
  ==================================================================== */
  getSubscriptions(){
    return this.http.get<{subscriptions: Subscriptions[], ok: boolean, total: number}>(`${base_url}/subscriptions`, this.headers);
  }

  /** ================================================================
   *   GET SEARCH SUBSCRIPTION
  ==================================================================== */
  searchSubscriptions(query: any){
    return this.http.get<{subscriptions: Subscriptions[], ok: boolean, total: number}>(`${base_url}/subscriptions/search/${query}`, this.headers);
  }

  /** ================================================================
   *   GET SUBSCRIPTION QUERY
  ==================================================================== */
  getSubscriptionQuery(query:any){
    return this.http.post<{subscriptions: Subscriptions[], ok: boolean}>(`${base_url}/subscriptions/query`, query, this.headers);
  }

  /** ================================================================
   *   CREATE SUBSCRIPTION
  ==================================================================== */
  createSubscription(formData: any){
    return this.http.post<{subscription: Subscriptions, ok: boolean}>(`${base_url}/subscriptions`, formData, this.headers);
  }

  /** ================================================================
   *   UPDATE SUBSCRIPTION
  ==================================================================== */
  updateSubscription(formData:any, id: string){
    return this.http.put<{subscription: Subscriptions, ok: boolean}>(`${base_url}/subscriptions`, formData, this.headers);
  }


  // FIN DE LA CLASES
}
