import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../primeng.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recovery-page',
  standalone: true,
  imports: [PrimeNgModule, RouterModule],
  templateUrl: './recovery-page.component.html',
})
export class RecoveryPageComponent {

}
