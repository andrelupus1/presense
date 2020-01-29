import { TestBed } from '@angular/core/testing';

import { CrimesService } from './crimes.service';

describe('CrimesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrimesService = TestBed.get(CrimesService);
    expect(service).toBeTruthy();
  });
});
