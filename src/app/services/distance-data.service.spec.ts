import { TestBed } from '@angular/core/testing';

import { DistanceDataService } from './distance-data.service';

describe('DistanceDataService', () => {
  let service: DistanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
