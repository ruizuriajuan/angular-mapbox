import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../primeng.module';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  selector: 'app-markers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeNgModule],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') public divMap?: ElementRef;
  zoom: number = 17;
  rangeValues: number[] = [-2, 22];
  map?: Map;
  lngLat: LngLat = new LngLat(-68.13177005775611, -16.496682832961042);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw ('Elemento HTML map no encontrado');
    this.map = new Map({
      accessToken: environments.MAPBOX_KEY,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,
      zoom: this.zoom, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'mostrando texto'

    // const marker = new Marker({ color: 'red', element: markerHtml })
    //   .setLngLat( this.lngLat )
    //   .addTo( this.map );
    this.readFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker() {
    if (!this.map) return;
    //color hexadecimal aleatorio
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({ color, marker });
    //por movimiento, asi recuperamos lnglat
    marker.on('dragend', () => this.saveToLocalStorage());
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //OJO: posible falla en el tipo

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marca: Marker) {
    this.map?.flyTo({
      zoom:14,
      center: marca.getLngLat()
    })
  }

}
