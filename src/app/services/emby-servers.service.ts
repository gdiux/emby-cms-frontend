import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { Server } from '../models/servers.model';

// INTERFACES
import { LoadServers } from '../interfaces/load-servers.interface';

// ENVIRONMENT
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmbyServersService {

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
   *  LOAD SERVERS
  ==================================================================== */
  loadServers(){
    return this.http.get<LoadServers>( `${base_url}/servers`, this.headers );
  }

  /** ================================================================
   *  LOAD SERVER BY ID
  ==================================================================== */
  loadServerId(id: string){
    return this.http.get<{ok: boolean, server: Server}>(`${base_url}/servers/server/${id}`, this.headers);
  }


  /** ================================================================
   *  CREATE SERVER
  ==================================================================== */
  createServer( formaData: any ){
    return this.http.post<{server: Server, ok: boolean}>(`${base_url}/servers`, formaData, this.headers);
  }

  /** ================================================================
   *  UPDATE SERVER
  ==================================================================== */
  updateServer( formData: any, id: string ){
    return this.http.put< { server: Server, ok: boolean } >(`${base_url}/servers/${id}`, formData, this.headers);
  }

  // FIN DE LA CLASE
}
