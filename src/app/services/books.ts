import { Injectable } from '@angular/core';
import { IBook } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  saveBooks(books: IBook[]): void {
    window.localStorage.setItem('books', JSON.stringify(books));
    console.log('Books saved:', books);
  }

  getBooks(): IBook[] {
    return JSON.parse(window.localStorage.getItem('books') || '[]');
  }

  deleteBook(index: number): void {
    const books = this.getBooks();
    if (index >= 0 && index < books.length) {
      books.splice(index, 1);
      this.saveBooks(books);
    }
  }

}
