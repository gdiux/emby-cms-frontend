import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ENVIRONMENT
import { environment } from '../../environments/environment';

const api_key = environment.api_key;
const emby_url = environment.emby_url;

@Injectable({
  providedIn: 'root'
})
export class EmbyUsersService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'X-Emby-Token': api_key
      }
    }
  }

  /** ================================================================
   *  LOAD USERS EMBY
  ==================================================================== */
  loadUsersEmby(){
    return this.http.get( `${emby_url}/Users/Query`, this.headers );
  }

  /** ================================================================
   *  DESACTIVE USER EMBY
  ==================================================================== */
  updatePolicyUser(id: string, body: any){

    return this.http.post(`${emby_url}/Users/${id}/Policy`, body, this.headers)

  }


  // FIN DE LA CLASE
}
