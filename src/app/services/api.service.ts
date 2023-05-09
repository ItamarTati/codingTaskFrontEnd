// This is an Angular service that provides access to an API that retrieves transaction data for parents and children.
// It defines two interfaces, ParentTransaction and ChildTransactions, which describe the structure of the data returned by the API.
// The service is defined as an injectable class, which means it can be injected into other components or services.
// It uses the Angular HttpClient to make HTTP requests to the API endpoints.
// The getParentTransactions and getChildTransactions methods return Observables that emit the retrieved transaction data.
// The catchError operator is used to catch any errors that may occur during the HTTP requests.
// If an error occurs, it logs the error to the console and re-throws the error using throwError, which causes the Observable to emit an error notification.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ParentTransaction {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
}

export interface ChildTransactions {
  id: number;
  parentId: number;
  paidAmount: number;
}

export enum Direction {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getParentTransactions(page: number, direction: Direction): Observable<ParentTransaction[]> {
    const url = `https://codingtask-production.up.railway.app/parents?page=${page}&sortOrder=${direction}`;
    return this.http.get<ParentTransaction[]>(url).pipe(
      catchError((error) => {
        console.log('Error:', error);
        return throwError(() => error);
      })
    );
  }

  getChildTransactions(parentId: number): Observable<ChildTransactions[]> {
    const url = `https://codingtask-production.up.railway.app/children/${parentId}`;
    return this.http.get<ChildTransactions[]>(url).pipe(
      catchError((error) => {
        console.log('Error:', error);
        return throwError(() => error)
      })
    );
  }
}
