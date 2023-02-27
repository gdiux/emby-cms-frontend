import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/models/servers.model';
import { EmbyServersService } from 'src/app/services/emby-servers.service';

// SERVICES
import { EmbyUsersService } from 'src/app/services/emby-users.service';
import Swal from 'sweetalert2';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SubscriptionsService } from '../../services/subscriptions.service';

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
                private subscriptionsService: SubscriptionsService,
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
   *  DESACTIVATE EMBY USERS
  ==================================================================== */
  desactive(id: string, IsDisabled: boolean, IsAdministrator: boolean, SimultaneousStreamLimit:any){

    if (IsDisabled) {
      IsDisabled = false;
    }else{
      IsDisabled = true;
    }

    if (IsAdministrator) {

      this.embyUsersService.updatePolicyUser(id, { IsAdministrator: false, "IsDisabled":IsDisabled, "SimultaneousStreamLimit": SimultaneousStreamLimit }, this.server.url, this.server.apikey)
        .subscribe( resp => {

          this.embyUsersService.updatePolicyUser(id, { IsAdministrator: true, "SimultaneousStreamLimit": SimultaneousStreamLimit }, this.server.url, this.server.apikey)
            .subscribe( resp => {

              if (IsDisabled) {
                Swal.fire('Great', 'The user has been deactivated successfully!', 'success');
              }else{
                Swal.fire('Great', 'The user has been activated successfully!', 'success');
              }

              this.loadUsers();
              
            }, (err) => {
              console.log(err);          
              Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
            }); 
            
          }, (err) => {
            console.log(err);          
            Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
          }); 

    }else{

      this.embyUsersService.updatePolicyUser(id, { "IsDisabled":IsDisabled, "SimultaneousStreamLimit": SimultaneousStreamLimit }, this.server.url, this.server.apikey)
          .subscribe( resp => {
  
            if (IsDisabled) {
              Swal.fire('Great', 'The user has been deactivated successfully!', 'success');
            }else{
              Swal.fire('Great', 'The user has been activated successfully!', 'success');
            }
  
            this.loadUsers();
  
          }, (err) => {
            console.log(err);          
            Swal.fire('Error', 'an error occurred while connecting to the emby server', 'error');
          }); 
    } 


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
   * SELECT USER SUBSCRIPTION
  =============================================================== */
  public selectUser: any;
  public subscriptionUserActive: boolean = false;
  public subscriptionUser: any;
  public formDataSubscription: any = {};

  seletUserSubscriptions(){

    let fecha = new Date();
    
    this.formDataSubscription = {};
    delete this.subscriptionUser;
    
    this.formDataSubscription = {
      name: this.selectUser.Name,
      email: this.selectUser.ConnectUserName || '',
      uid: this.selectUser.Id,
      expiration: fecha.setTime(fecha.getTime() + 2592000000),
      server: this.server.sid,
    }

    this.subscriptionsService.getSubscriptionQuery({uid: this.formDataSubscription.uid})
        .subscribe( ({subscriptions}) => {

          if (subscriptions.length === 0) {
            this.subscriptionUserActive = false;
            return;
          }

          this.subscriptionUser = subscriptions[0];
          this.subscriptionUserActive = true;
    
    }, (err) => {
      console.log(err);
      Swal.fire('Error', err.error.msg, 'error');      
    });


  }

  /** =============================================================
   * CREATE USER SUBSCRIPTION
  =============================================================== */
  public submittedSubscriptionNew: boolean = false;
  createSubscription(){
    this.submittedSubscriptionNew = true;

    this.subscriptionsService.createSubscription(this.formDataSubscription)
        .subscribe( ({subscription}) => {
          
          Swal.fire('Great', `The subscription of the user ${this.formDataSubscription.Name} has been created successfully`, 'success');
          this.subscriptionUserActive = true;
          this.subscriptionUser = subscription;

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

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
