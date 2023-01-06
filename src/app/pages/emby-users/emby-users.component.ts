import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// SERVICES
import { EmbyUsersService } from 'src/app/services/emby-users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emby-users',
  templateUrl: './emby-users.component.html',
  styleUrls: ['./emby-users.component.css']
})
export class EmbyUsersComponent implements OnInit {

  constructor(  private embyUsersService: EmbyUsersService,
                private fb: FormBuilder){}

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
    
    this.embyUsersService.creatUserEmby(this.formNewUser.value)
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

  // FIN DE LA CLASE
}
