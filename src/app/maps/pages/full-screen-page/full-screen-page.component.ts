import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';

//(mapboxgl as any).accessToken = 'pk.eyJ1IjoicnVpenVyaWFqdWFuIiwiYSI6ImNrdGtzM2RyYjB1Mngyd28wbmxsZTh3eDYifQ.j5j-5g9LOQ_RdJx2Dycd-w';

@Component({
  selector: 'app-full-screen-page',
  standalone: true,
  imports: [],
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') public mapa?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.mapa) throw ('Elemento HTML map no encontrado');
    const map = new Map({
      accessToken: environments.MAPBOX_KEY,
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
