import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../primeng.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [PrimeNgModule, RouterModule],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

}
