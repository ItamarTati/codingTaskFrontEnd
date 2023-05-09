import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService, ParentTransaction, Direction } from '../../services/api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Using OnPush change detection strategy for performance optimization
})
export class ParentsComponent implements OnInit {
  public currentPage: number = 1; // Initialize current page to 1
  public parentTransactions$: Observable<ParentTransaction[]> | undefined; // Observable to hold parent transactions
  public isLoading$ = new BehaviorSubject<boolean>(true); // BehaviorSubject to hold loading status
  public direction!: Direction // Property to hold the sort direction (ASCENDING or DESCENDING)

  constructor(
    private readonly apiService: ApiService
  ) { }

  public ngOnInit(): void {
    this.getParentTransactions(); // Call method to fetch parent transactions on component initialization
  }

  private getParentTransactions(currentPage: number = 1, direction: Direction = Direction.ASCENDING): void {
    this.isLoading$.next(true); // Set loading status to true
    this.parentTransactions$ = this.apiService
      .getParentTransactions(currentPage, direction)
      .pipe(
        tap(() => this.isLoading$.next(false)) // Set loading status to false after getting parent transactions
      );
  }

  public pageChanged(event?: PageEvent) {
    // Method to handle page change event from paginator
    if (event === undefined) {
      return;
    }

    switch (
    event.pageIndex // Determine which page was selected
    ) {
      case 0:
        this.firstPage();
        break;
      case 3:
        this.lastPage();
        break;
      default:
        if (
          event.previousPageIndex !== undefined &&
          event.pageIndex !== undefined
        ) {
          if (event.previousPageIndex > event.pageIndex) {
            this.prevPage();
          } else {
            this.nextPage();
          }
        }
        break;
    }
  }

  public firstPage(): void {
    // Method to fetch first page of parent transactions
    this.currentPage = 1;
    this.getParentTransactions(this.currentPage, this.direction);
  }

  public nextPage(): void {
    // Method to fetch next page of parent transactions
    this.currentPage++;
    this.getParentTransactions(this.currentPage, this.direction);
  }

  public prevPage(): void {
    // Method to fetch previous page of parent transactions
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getParentTransactions(this.currentPage, this.direction);
    }
  }

  public lastPage(): void {
    // Method to fetch last page of parent transactions
    this.currentPage = 4;
    this.getParentTransactions(this.currentPage, this.direction);
  }

  public changeOrder(direction: Direction): void {
    // Method to change the sort direction of the parent transactions
    this.direction = direction
    this.getParentTransactions(this.currentPage, this.direction);
  }
}
