import { Pipe, PipeTransform } from '@angular/core';

import { environment } from "../../environments/environment"

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo:  'user' ): string {

    console.log('piep:', img);
    

    if (img) {
          return `${base_url}/uploads/${tipo}/${img}`;
    }else{
        return `${base_url}/uploads/${tipo}/no-image`;
    }

  }

}
