import { Component, OnInit } from '@angular/core';

// SERVICES
import { EmbyUsersService } from 'src/app/services/emby-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emby-users',
  templateUrl: './emby-users.component.html',
  styleUrls: ['./emby-users.component.css']
})
export class EmbyUsersComponent implements OnInit {

  constructor(  private embyUsersService: EmbyUsersService){}

  ngOnInit(): void {

    // LOAD EMBY USERS
    this.loadUsers();
  }

  /** ================================================================
   *  LOAD USERS EMBY
  ==================================================================== */
  public users: any[] = [];
  loadUsers(){

    this.embyUsersService.loadUsersEmby()
        .subscribe( (resp:any) => {

          this.users = resp.Items;          

        }, (err) => {
          Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
        });
  }

  /** ================================================================
   *  DESACTIVE USERS EMBY
  ==================================================================== */
  desactive(id: string, IsDisabled: boolean, IsAdministrator: boolean){

    if (IsAdministrator) {
      Swal.fire('Attention', 'you cant disable an administrator', 'warning');
      return;      
    }

    if (IsDisabled) {
      IsDisabled = false;
    }else{
      IsDisabled = true;
    }

    this.embyUsersService.updatePolicyUser(id, { "IsDisabled":IsDisabled })
        .subscribe( resp => {

          if (IsDisabled) {
            Swal.fire('Great', 'The user has been deactivated successfully!', 'success');
          }else{
            Swal.fire('Great', 'The user has been activated successfully!', 'success');
          }
          
          // TODO: ACTUALIZAR SIN RECARGAR
          this.loadUsers();

        }, (err) => {
          console.log(err);          
          Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
        }); 

  }

  // FIN DE LA CLASE
}
