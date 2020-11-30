import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { AuthFirebaseService } from '../../services/auth-firebase.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  recordarClave = false;

  constructor( private authService: AuthFirebaseService,
               private router: Router ) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  registrar(form: NgForm): void {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();
    this.authService.register(this.usuario)
        .subscribe((response) => {
          console.log(response);
          Swal.close();
          if (this.recordarClave) {
              localStorage.setItem('email', this.usuario.email);
          }
          this.router.navigateByUrl('/home');
        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            title: 'Error al registrar usuario',
            text: err.error.error.message,
            icon: 'error',
          });
        });
  }
}
