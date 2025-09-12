import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IBook } from '../models/interfaces';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BooksFirestoreService {

  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor() { }

  getBooks(): Observable<IBook[]> {
    const booksRef = collection(this.firestore, 'books');
    const q = query(booksRef, where('userPropietari', '==', this.auth.currentUser?.uid));
    return collectionData(q, { idField: 'id'}) as Observable<IBook[]>;
  }

  getBookById(id: string): Observable<IBook> {
    const bookDocRef = doc(this.firestore, `books/${id}`);
    return docData(bookDocRef, { idField: 'id' }) as Observable<IBook>;
  }

  saveBook(book: IBook) {
    book.userPropietari = this.auth.currentUser?.uid;
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