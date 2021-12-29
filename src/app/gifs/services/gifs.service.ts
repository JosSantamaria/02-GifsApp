import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResultadosComponent } from '../resultados/resultados.component';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

 private apiKey: string = 'XqXJxZIE1G6DCxNGk6Opbwi2EY4dseud';

private _historial: string[] =[];


//ToDo: change 'any' for a specific data type.
public resultados: Gif[] = [];

get historial()
{
  
  return [...this._historial]
}

constructor(private http: HttpClient ) { 

  //recuperacion de busquedas en LocalStorage
  this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
  
  //localStorage.getItem('historial');
  
  // if(localStorage.getItem('historial')){
  //   this._historial = JSON.parse( localStorage.getItem('historial')! )
  // }

  this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

}

buscarGifs(query: string = ''){

  query = query.trim().toLocaleLowerCase(); 

  if( !this._historial.includes( query ) ){
       this._historial.unshift( query );
       this._historial = this._historial.splice(0,10);

       //Almacenamiento de busquedas en LocalStorage
       localStorage.setItem('historial',JSON.stringify( this._historial) );
  
  }
    //Mejora: parametros en variables para acortar el codigo.
    const params = new HttpParams()
                  .set('api_key',this.apiKey)
                  .set('limit','10')
                  .set('q',query);

  

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
        .subscribe((resp) => {
         
          this.resultados = resp.data; 
          localStorage.setItem('resultados',JSON.stringify(this.resultados) )

        });

      
      

}

}
