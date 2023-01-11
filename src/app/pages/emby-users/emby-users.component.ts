import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/models/servers.model';
import { EmbyServersService } from 'src/app/services/emby-servers.service';

// SERVICES
import { EmbyUsersService } from 'src/app/services/emby-users.service';
import Swal from 'sweetalert2';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-emby-users',
  templateUrl: './emby-users.component.html',
  styleUrls: ['./emby-users.component.css']
})
export class EmbyUsersComponent implements OnInit {

  constructor(  private embyUsersService: EmbyUsersService,
                private embyServersService: EmbyServersService,
                private fb: FormBuilder){}

  ngOnInit(): void {

    // CARGAR SERVIDORES
    this.loadServers();

  }

  /** ================================================================
   *  LOAD SERVERS EMBY
  ==================================================================== */
  public servers: Server[] = [];
  public server!: Server;

  loadServers(){

    this.embyServersService.loadServers()
        .subscribe( ({servers}) => {

          if (servers.length === 0) {
            return;
          }

          this.server = servers[0];
          this.servers = servers;

          // CARGAR USUARIOS
          this.loadUsers();

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  /** ================================================================
   *  LOAD USERS EMBY
  ==================================================================== */
  public users: any[] = [];
  loadUsers(){

    this.embyUsersService.loadUsersEmby(this.server.url, this.server.apikey)
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

    this.embyUsersService.updatePolicyUser(id, { "IsDisabled":IsDisabled }, this.server.url, this.server.apikey)
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

  /** ================================================================
   *  NEW USER
  ==================================================================== */
  public formSubmitted: boolean = false;
  public formNewUser = this.fb.group({
    Name: ['', [Validators.required ]],
    Policy: new FormGroup({
      IsAdministrator: new FormControl(false)
    })

  });

  createUser(){
    
    this.formSubmitted = true;
    
    if (this.formNewUser.invalid) {
      return;
    }
    
    this.embyUsersService.creatUserEmby(this.formNewUser.value, this.server.url, this.server.apikey)
    .subscribe( resp => {
      
          this.formSubmitted = false;
          
          this.users.push(resp);

          this.formNewUser.reset();
          Swal.fire('Great', 'The user has been created successfully', 'success');
          
        }, (err) => {
          this.formSubmitted = false;
          console.log(err);
          Swal.fire('Error', 'Failed to create user, please try again', 'error');
        } );
    
  }


  /** ======================================================================
   * VALIDATE FORM
  ====================================================================== */
  validate( campo: string): boolean{
    
    if ( this.formNewUser.get(campo)?.invalid && this.formSubmitted ) {      
      return true;
    }else{
      return false;
    }

  }

  /** =============================================================
   * SELECT SERVER
  =============================================================== */
  selectServer(server: Server){

    this.server = server;
    this.loadUsers();

  }

  /** =============================================================
   * CONFIG SWIPER
  =============================================================== */
  public config = {

    slidesPerView:1,
    spaceBetween:10,
    pagination: { clickable: true, dynamicBullets: true },
    
    breakpoints:{
      '500': {
        slidesPerView: 2,
        spaceBetween: 20
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 20
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }

  }

  // FIN DE LA CLASE
}
