import { Component } from '@angular/core';

// MODELS
import { User } from 'src/app/models/users.model';

// SERVICE
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public user!: User;

  constructor( private usersService: UsersService){

    // CARGAR USER
    this.user = usersService.user;

  }

  /** ==============================================================================
   * LOGOUT
  ================================================================================*/

  logout(){
    this.usersService.logout();
  }

}
