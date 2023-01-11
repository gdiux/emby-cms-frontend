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
  loadUsersEmby(server: string, apikey:string){
    return this.http.get( `${server}/Users/Query`, {
      headers: {
        'X-Emby-Token': apikey
      }
    });
  }

  /** ================================================================
   *  DESACTIVE USER EMBY
  ==================================================================== */
  updatePolicyUser(id: string, body: any, server: string, apikey:string){

    return this.http.post(`${server}/Users/${id}/Policy`, body, {
      headers: {
        'X-Emby-Token': apikey
      }
    })

  }

  /** ================================================================
   *  CREATE USER EMBY
  ==================================================================== */
  creatUserEmby(FormData: any, server: string, apikey:string){

    return this.http.post(`${server}/Users/New`, FormData, {
      headers: {
        'X-Emby-Token': apikey
      }
    })

  }


  // FIN DE LA CLASE
}
