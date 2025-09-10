import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, logOut, logOutOutline } from 'ionicons/icons';
import { FormLlibres } from 'src/app/components/form-llibres/form-llibres';
import { IBook } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonIcon, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, FormLlibres, RouterModule],
})
export class Tab1Page implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  title: string = 'Home';
  llistaLlibres: IBook[] = [];

  index = -1;

  ngOnInit() {
    this.llistaLlibres = this.booksService.getBooks();
  }

  constructor(private booksService: BooksService) {
    this.llistaLlibres = this.booksService.getBooks();
  }

  submitBook(newBook: IBook): void {
    console.log('New book que rebem del component fill:', newBook);
    this.llistaLlibres.push(newBook);
    this.booksService.saveBooks(this.llistaLlibres);
  }


  deleteLlibre(index: number): void {
    this.booksService.deleteBook(index);
    this.llistaLlibres = this.booksService.getBooks();
  }

  editLlibre(index: number): void {
    this.index = index;
  }

  submitEditBook(newBook: IBook): void {
    console.log('New Book al component Home:', newBook);
    this.llistaLlibres[this.index] = newBook;
    this.booksService.saveBooks(this.llistaLlibres);
    this.index = -1; // Reset index after editing
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('User logged out');
      this.router.navigateByUrl('/login', { replaceUrl: true });
    });
  }

}
