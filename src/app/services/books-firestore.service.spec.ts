import { TestBed } from '@angular/core/testing';

import { BooksFirestoreService } from './books-firestore.service';

describe('BooksFirestoreService', () => {
  let service: BooksFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
