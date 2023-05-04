import { TestBed } from '@angular/core/testing';

import { GetParentsAndChildrenService } from './get-parents-and-children.service';

describe('GetParentsAndChildrenService', () => {
  let service: GetParentsAndChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetParentsAndChildrenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
