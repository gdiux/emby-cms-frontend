import { Component } from '@angular/core';

// MODELS
import { User } from 'src/app/models/users.model';

// SERVICES
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public user!: User;

  constructor(  private usersService: UsersService) { 

    // CARGAR USER
    this.user = usersService.user;

  }

}
