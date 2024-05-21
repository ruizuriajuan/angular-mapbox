import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PrimeNgModule } from '../../../primeng.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, RouterModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private service = inject(AuthService);
  private ruta = inject(Router);

  login() {
    /*this.service.login('usuario', 'contrasenia')
      .subscribe(user => {
        console.log('usuario: ', user);
        this.ruta.navigate(['/maps'])
      })*/
      this.ruta.navigateByUrl('/maps/fullscreen'); 
  }

  crearCuenta(){
    this.ruta.navigateByUrl('register');
  }
}
