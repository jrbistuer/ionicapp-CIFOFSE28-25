import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonRouterLink } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink, RouterModule]
})
export class LoginPage {

  title: string = 'Login';

  loginForm!: FormGroup; // Define the type of loginForm if using Reactive Forms

  constructor() {
    // Initialization logic can go here if needed
    this.createForm();
  }

  enviar() {
    // Logic to handle form submission can be added here
    console.log('Form submitted');
    const usuari = (document.getElementById('username') as HTMLInputElement).value;
    const contrasenya = (document.getElementById('password') as HTMLInputElement).value;
    console.log(`Usuari: ${usuari}, Contrasenya: ${contrasenya}`);
    // You can add further logic to handle the login process
  }

  enviarReactiveForm() {
    // Logic to handle form submission with Reactive Forms
    console.log('Reactive Form submitted', this.loginForm);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(`Username: ${username}, Password: ${password}`);
      // You can add further logic to handle the login process
    } else {
      console.log('Form is invalid');
    }
  }

  createForm() {
    // Logic to create a form can be added here if needed
    console.log('Creating form');
    // Creating Reactive Form
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  goto() {
    console.log('Navigating to Login page');
  }

}
