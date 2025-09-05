import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBook } from '../../models/interfaces';
import { BooksService } from '../../services/books';
import { IonItem, IonButton, IonLabel, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-form-llibres',
  imports: [IonInput, IonLabel, IonButton, IonItem, ReactiveFormsModule],
  templateUrl: './form-llibres.html',
  styleUrl: './form-llibres.scss'
})
export class FormLlibres {

  @Output() onSubmit = new EventEmitter<IBook>(); 
  @Output() onEdit = new EventEmitter<IBook>();

  index: number = -1; // To track the index of the book being edited

  get indexLlibre(): number {
    return this.index;
  }

  @Input() set indexLlibre(value: number) {
    if (value !== -1) {
      this.index = value;
      this.setBookToEdit();
    }
  }

  bookForm!: FormGroup; // Define the type of bookForm if using Reactive Forms

  constructor(private booksService: BooksService) {
    this.createBookForm();
  }

  createBookForm(): void {
    this.bookForm = new FormGroup({
      titol: new FormControl('', [Validators.required, Validators.minLength(3)]),
      autor: new FormControl('', Validators.required),
      anyPublicacio: new FormControl(''),
      editorial: new FormControl('', Validators.required),
      pagines: new FormControl('', Validators.required),
      isbn: new FormControl('')
    });
  }

  setBookToEdit(): void {
    const book = this.booksService.getBooks()[this.index];
    this.bookForm.patchValue({
      titol: book.titol,
      autor: book.autor,
      anyPublicacio: book.anyPublicacio || '',
      editorial: book.editorial,
      pagines: book.pagines,
      isbn: book.isbn || ''
    });
  }

  submitBook(): void {
    if (this.bookForm.valid) {
      const newBook: IBook = this.bookForm.value;
      console.log('New Book al component FormLlibres abans d\'emetre:', newBook);
      this.onSubmit.emit(newBook);
      this.bookForm.reset();
    }
  }

  submitEditBook() {
    if (this.bookForm.valid) {
      const newBook: IBook = this.bookForm.value;
      this.onEdit.emit(newBook);
      this.bookForm.reset();
    } 
  }


}
