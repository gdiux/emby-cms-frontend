import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent {

  public page!: string;

  constructor(  private router: Router) { 
    
    this.router.events
        .pipe(
          filter( event => event instanceof ActivationEnd ),
          filter( (event: any) => event.snapshot.firstChild === null  ),
          map( (event: any) => event.snapshot.data )
        )
        .subscribe( data => {

          this.page = data.title;
          document.title = `${data.title} - CMS - Emby`;
        
        }); 
  }

}
