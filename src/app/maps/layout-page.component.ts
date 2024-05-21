import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet,SideMenuComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export default class LayoutPageComponent {

}
