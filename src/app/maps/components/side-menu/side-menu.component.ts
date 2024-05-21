import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../primeng.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

interface MenuItem {
  ruta: string,
  icon: string
  name: string,
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [PrimeNgModule, CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public itemsMenu: MenuItem[] = [
    { ruta: '/maps/fullscreen', icon: PrimeIcons.WINDOW_MAXIMIZE, name: 'Pantalla Completa' },
    { ruta: '/maps/zoomrange', icon: PrimeIcons.SEARCH_PLUS, name: 'Zoom' },
    { ruta: '/maps/markers', icon: PrimeIcons.MAP_MARKER, name: 'Marcadores' },
    { ruta: '/maps/properties', icon: PrimeIcons.MAP, name: 'Lugar' }
  ]
}
