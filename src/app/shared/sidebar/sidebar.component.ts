import { Component} from '@angular/core';
//Importacion de GifServices para usar el contructor y poder llamar al propiedad que recopila el historial.
import { GifsService } from '../../gifs/services/gifs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {


get historial(){
 return this.gifsService.historial;
}

//Inyeccion de dependencias con el constructor
constructor(private gifsService:GifsService){ }

  buscar(termino:string){
    this.gifsService.buscarGifs(termino);
    
  }

}
