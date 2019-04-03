import { TestBed, inject } from '@angular/core/testing';

import { ValidationMessageService } from './validation-message.service';

describe('ValidationMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationMessageService]
    });
  });

  it('should be created', inject([ValidationMessageService], (service: ValidationMessageService) => {
    expect(service).toBeTruthy();
  }));
});
