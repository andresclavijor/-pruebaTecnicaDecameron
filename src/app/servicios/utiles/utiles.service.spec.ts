import { TestBed } from '@angular/core/testing';

import { UtilesService } from './utiles.service';

describe('UtilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilesService = TestBed.get(UtilesService);
    expect(service).toBeTruthy();
  });
});
