import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParentTransaction {
  id: number;
  sender: string;
  receiver: string;
  totalAmount: number;
}

export interface ChildTransactions {
  id: number;
  parentId: number
  paidAmount: number
}

@Injectable({
  providedIn: 'root'
})
export class GetParentsAndChildrenService {

  constructor(private http: HttpClient) { }

  getParentTransactions(page: number): Observable<ParentTransaction[]> {
    const url = `https://codingtask-production.up.railway.app/parents?page=${page}`;
    return this.http.get<ParentTransaction[]>(url);
  }

   getChildTransactions(parentId: number): Observable<ChildTransactions[]> {
     const url = `https://codingtask-production.up.railway.app/children/${parentId}`;
     return this.http.get<ChildTransactions[]>(url);
   }
}
