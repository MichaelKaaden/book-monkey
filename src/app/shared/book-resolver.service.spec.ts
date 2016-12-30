/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookResolver } from './book-resolver.service';

describe('BookResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookResolver]
    });
  });

  it('should ...', inject([BookResolver], (service: BookResolver) => {
    expect(service).toBeTruthy();
  }));
});
