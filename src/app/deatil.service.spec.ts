import { TestBed } from '@angular/core/testing';

import { DeatilService } from './deatil.service';

describe('DeatilService', () => {
  let service: DeatilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeatilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
