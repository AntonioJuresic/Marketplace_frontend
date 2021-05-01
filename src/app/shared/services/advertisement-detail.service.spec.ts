import { TestBed } from '@angular/core/testing';

import { AdvertisementDetailService } from './advertisement-detail.service';

describe('AdvertisementDetailService', () => {
  let service: AdvertisementDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
