// This Angular component is responsible for displaying a list of child transactions related to a specific parent. Here are some comments explaining why I chose to write the code this way:

// The @Input decorator is used for loadingMessage so that it can be passed to the child component app-loading-spinner to display a loading message.
// OnInit lifecycle hook is implemented to fetch the parentId from the current route parameters, and then calls getChildTransactions to fetch the child transactions from the ApiService.
// BehaviorSubject is used to manage the loading state of the component. It's initially set to true, and is updated to false when the API call is completed.
// The childTransactions$ variable is an observable of ChildTransactions[] that is assigned the result of the getChildTransactions API call. This is done using the async pipe in the HTML template to handle the subscription.
// The *ngIf structural directive is used to display the app-transactions-table component and a message if there are no transactions.
// The else keyword is used with ng-template to display a spinner while the data is being loaded.
// A Go back to Parent Transactions button is displayed using routerLink to navigate back to the parent transactions page.

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiService, ChildTransactions } from '../../services/api.service'
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenComponent implements OnInit{
  public childTransactions$: Observable<ChildTransactions[]> | undefined;
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public parentId!: number;

  constructor(
      private route: ActivatedRoute,
      private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    const parentId = this.route.snapshot.paramMap.get('parentId');
    if (parentId !== null) {
      this.parentId = +parentId;
    } else {
      return;
    }
    this.getChildTransactions(this.parentId);
  }

  private getChildTransactions(parentId: number): void {
     this.isLoading$.next(true)
     this.childTransactions$ = this.apiService.getChildTransactions(parentId).pipe(
       tap(() => this.isLoading$.next(false))
     );
   }
}
