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

  mLlibre: IBook | undefined; // To track the index of the book being edited

  get llibre(): IBook | undefined {
    return this.mLlibre;
  }

  @Input() set llibre(llibre: IBook | undefined) {
    if (llibre) {
      this.mLlibre = llibre;
      this.setBookToEdit();
    }
  }

  bookForm!: FormGroup; // Define the type of bookForm if using Reactive Forms

  constructor(private booksService: BooksService) {
    this.createBookForm();
  }

  createBookForm(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      titol: new FormControl('', [Validators.required, Validators.minLength(3)]),
      autor: new FormControl('', Validators.required),
      anyPublicacio: new FormControl(''),
      editorial: new FormControl('', Validators.required),
      pagines: new FormControl('', Validators.required),
      isbn: new FormControl('')
    });
  }

  setBookToEdit(): void {
    if (this.mLlibre) {
      this.bookForm.patchValue({
        id: this.mLlibre.id,
        titol: this.mLlibre.titol,
        autor: this.mLlibre.autor,
        anyPublicacio: this.mLlibre.anyPublicacio || '',
        editorial: this.mLlibre.editorial,
        pagines: this.mLlibre.pagines,
        isbn: this.mLlibre.isbn || ''
      });
    }
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
