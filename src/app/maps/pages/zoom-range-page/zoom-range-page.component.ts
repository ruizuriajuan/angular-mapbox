import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';
import { PrimeNgModule } from '../../../primeng.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zoom-range-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeNgModule],
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  

  @ViewChild('map') public divMap?: ElementRef;
  zoom: number = 17;
  rangeValues: number[] = [-2, 22];
  map?: Map;
  lngLat : LngLat = new LngLat(-68.13177005775611, -16.496682832961042);

  ngAfterViewInit(): void {
    if (!this.divMap) throw ('Elemento HTML map no encontrado');
    this.map = new Map({
      accessToken: environments.MAPBOX_KEY,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: this.zoom, // starting zoom
    });

    this.listenerMap();
  }

  ngOnDestroy(): void {
    this.map?.remove;
  }

  listenerMap() {
    if (!this.map) throw 'Mapa no cargado';
    
    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('move', (e)=>{
      this.lngLat = this.map!.getCenter();
    })
  }

  zoomChanged( value: number  | undefined) {
    if(!value) return;
    this.zoom = value;
    this.map?.zoomTo( value );
  }

}
