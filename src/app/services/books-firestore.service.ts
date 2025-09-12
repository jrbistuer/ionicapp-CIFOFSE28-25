import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IBook } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksFirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  getBooks(): Observable<IBook[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id'}) as Observable<IBook[]>;
  }

  getBookById(id: string): Observable<IBook> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return docData(bookDocRef, { idField: 'id' }) as Observable<IBook>;
  }

  saveBook(book: IBook) {
    const booksRef = collection(this.firestore, 'books');
    return addDoc(booksRef, book);
  }

  deleteBook(book: IBook) {
    const bookDocRef = doc(this.firestore, `books/${book.id}`);
    return deleteDoc(bookDocRef);
  }

  updateBook(book: IBook) {
    const bookDocRef = doc(this.firestore, `books/${book.id}`);
    return updateDoc(bookDocRef, { ...book });
  }

}