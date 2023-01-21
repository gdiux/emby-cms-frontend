import { Component, OnInit } from '@angular/core';

// SERVICES
import { EmbyServersService } from '../../services/emby-servers.service';
import { Server } from 'src/app/models/servers.model';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emby-servers',
  templateUrl: './emby-servers.component.html',
  styleUrls: ['./emby-servers.component.css']
})
export class EmbyServersComponent implements OnInit {

  constructor(  private embyServersService: EmbyServersService,
                private fb: FormBuilder){}

  ngOnInit(): void {

    // LOAD SERVERS
    this.loadServers();
    
  }

  /** ================================================================
   *  LOAD SERVERS
  ==================================================================== */
  public servers: Server[] = [];
  loadServers(){

    this.embyServersService.loadServers()
        .subscribe( ({servers}) => {
          
          this.servers = servers;          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** ================================================================
   *  CREATE SERVER
  ==================================================================== */
  public formSubmitted: boolean = false;
  public newServerForm = this.fb.group({
    name: ['', [Validators.required]],
    apikey: ['', [Validators.required]],
    url: ['', [Validators.required]],

  });

  createServer(){

    this.formSubmitted = true;
    
    if (this.newServerForm.invalid) {
      return;
    }
    
    this.embyServersService.createServer(this.newServerForm.value)
    .subscribe( ({server}) => {

        Swal.fire('Great', 'the server has been created successfully', 'success');
        this.servers.push(server);
        this.newServerForm.reset();
        this.formSubmitted = false;
        
      }, (err) => {
        this.formSubmitted = false;
        console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  /** ================================================================
   *  VALIDATE NEW FORM
  ==================================================================== */
  validate(campo:string): boolean{

    if (this.newServerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }

  }

  /** ================================================================
   *  SELECT SERVER
  ==================================================================== */
  selectServer(server: Server){

    this.editServerForm.setValue({
      id: server.sid!,
      name: server.name,
      apikey: server.apikey,
      url: server.url
    });

  }

  /** ================================================================
   *  EDIT SERVER
  ==================================================================== */
  public formSubmittedEdit: boolean = false;
  public editServerForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    apikey: ['', [Validators.required]],
    url: ['', [Validators.required]],

  });

  updateServer(){

    this.formSubmittedEdit = true;
    
    if (this.editServerForm.invalid) {
      return;
    }
    
    this.embyServersService.updateServer(this.editServerForm.value, this.editServerForm.value.id!)
    .subscribe( ({server}) => {

        Swal.fire('Great', 'The server has been successfully updated', 'success');
        this.formSubmittedEdit = false;
        this.loadServers();
        
      }, (err) => {
        this.formSubmittedEdit = false;
        console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  /** ================================================================
   *  VALIDATE NEW FORM
  ==================================================================== */
  validateEdit(campo:string): boolean{

    if (this.editServerForm.get(campo)?.invalid && this.formSubmittedEdit) {
      return true;
    }else{
      return false;
    }

  }


  // FIN DE LA CLASE
}
