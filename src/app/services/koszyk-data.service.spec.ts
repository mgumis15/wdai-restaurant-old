import { TestBed } from '@angular/core/testing';

import { KoszykDataService } from './koszyk-data.service';
describe('KoszykDataService', () => {
  let service: KoszykDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KoszykDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
