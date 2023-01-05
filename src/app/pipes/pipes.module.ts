import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PIPES
import { ImagenPipe } from './imagen.pipe';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [
    ImagenPipe, 
    FechaPipe
  ],
  exports: [
    ImagenPipe,
    FechaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
