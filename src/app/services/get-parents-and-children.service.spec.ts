import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GetParentsAndChildrenService, ParentTransaction, ChildTransactions } from './get-parents-and-children.service';

describe('GetParentsAndChildrenService', () => {
  let service: GetParentsAndChildrenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetParentsAndChildrenService]
    });
    service = TestBed.inject(GetParentsAndChildrenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getParentTransactions', () => {
    const page = 1;
    const parentTransactions: ParentTransaction[] = [
      {
        id: 1,
        sender: 'sender1',
        receiver: 'receiver1',
        totalAmount: 100
      },
      {
        id: 2,
        sender: 'sender2',
        receiver: 'receiver2',
        totalAmount: 200
      }
    ];

    it('should return parent transactions', () => {
      service.getParentTransactions(page).subscribe((data) => {
        expect(data).toEqual(parentTransactions);
      });

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/parents?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(parentTransactions);
    });

    it('should return an error if the server returns a 404 status', () => {
      const errorMessage = '404 Not Found';
      service.getParentTransactions(page).subscribe(
        (data) => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/parents?page=${page}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getChildTransactions', () => {
    const parentId = 1;
    const childTransactions: ChildTransactions[] = [
      {
        id: 1,
        parentId: 1,
        paidAmount: 50
      },
      {
        id: 2,
        parentId: 1,
        paidAmount: 50
      }
    ];

    it('should return child transactions', () => {
      service.getChildTransactions(parentId).subscribe((data) => {
        expect(data).toEqual(childTransactions);
      });

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/children/${parentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(childTransactions);
    });

    it('should return an error if the server returns a 404 status', () => {
      const errorMessage = '404 Not Found';
      service.getChildTransactions(parentId).subscribe(
        (data) => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/children/${parentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});
