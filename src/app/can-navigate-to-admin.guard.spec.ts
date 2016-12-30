/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';

describe('CanNavigateToAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanNavigateToAdminGuard]
    });
  });

  it('should ...', inject([CanNavigateToAdminGuard], (service: CanNavigateToAdminGuard) => {
    expect(service).toBeTruthy();
  }));
});
