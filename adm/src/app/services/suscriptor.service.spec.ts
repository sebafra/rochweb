import { TestBed, inject } from '@angular/core/testing';

import { SuscriptorService } from './suscriptor.service';

describe('SuscriptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuscriptorService]
    });
  });

  it('should be created', inject([SuscriptorService], (service: SuscriptorService) => {
    expect(service).toBeTruthy();
  }));
});
