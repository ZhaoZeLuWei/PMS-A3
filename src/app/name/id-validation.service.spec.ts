import { TestBed } from '@angular/core/testing';

import { IdValidationService } from './id-validation.service';

describe('IdValidationService', () => {
  let service: IdValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
