import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, ParentTransaction, ChildTransactions } from './api.service';
import { Direction } from './api.service'

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getParentTransactions', () => {
    it('should return an Observable<ParentTransaction[]>', () => {
      const dummyParentTransactions: ParentTransaction[] = [
        { id: 1, sender: 'sender1', receiver: 'receiver1', totalAmount: 100 },
        { id: 2, sender: 'sender2', receiver: 'receiver2', totalAmount: 200 },
      ];

      apiService.getParentTransactions(1, Direction.ASCENDING).subscribe((parentTransactions) => {
        expect(parentTransactions.length).toBe(2);
        expect(parentTransactions).toEqual(dummyParentTransactions);
      });

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/parents?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyParentTransactions);
    });

    it('should handle errors properly', () => {
      const errorMessage = '404 Not Found';

      apiService.getParentTransactions(1, Direction.ASCENDING).subscribe(
        () => fail('should have failed with the 404 error'),
        (error) => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/parents?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#getChildTransactions', () => {
    it('should return an Observable<ChildTransactions[]>', () => {
      const dummyChildTransactions: ChildTransactions[] = [
        { id: 1, parentId: 1, paidAmount: 50 },
        { id: 2, parentId: 1, paidAmount: 100 },
      ];

      apiService.getChildTransactions(1).subscribe((childTransactions) => {
        expect(childTransactions.length).toBe(2);
        expect(childTransactions).toEqual(dummyChildTransactions);
      });

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/children/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyChildTransactions);
    });

    it('should handle errors properly', () => {
      const errorMessage = '404 Not Found';

      apiService.getChildTransactions(1).subscribe(
        () => fail('should have failed with the 404 error'),
        (error) => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
        }
      );

      const req = httpMock.expectOne(`https://codingtask-production.up.railway.app/children/1`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });
});