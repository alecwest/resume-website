import { TestBed } from '@angular/core/testing';

import { SheetsService } from './sheets.service';
import { HttpClientModule } from '@angular/common/http';

describe('SheetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: SheetsService = TestBed.get(SheetsService);
    expect(service).toBeTruthy();
  });
});
