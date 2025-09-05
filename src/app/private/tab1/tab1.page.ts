import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormLlibres } from 'src/app/components/form-llibres/form-llibres';
import { IBook } from 'src/app/models/interfaces';
import { BooksService } from 'src/app/services/books';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FormLlibres, RouterModule],
})
export class Tab1Page implements OnInit {

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

}
