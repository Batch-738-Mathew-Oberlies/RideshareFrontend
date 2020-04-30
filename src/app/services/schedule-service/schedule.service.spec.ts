import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientModule } from '@angular/common/http';


describe('ScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ScheduleService]
  }));

  it('should be created', () => {
    const service: ScheduleService = TestBed.get(ScheduleService);
    expect(service).toBeTruthy();
  });
});
