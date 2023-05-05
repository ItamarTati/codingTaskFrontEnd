import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetParentsAndChildrenService, ParentTransaction } from '../../services/get-parents-and-children.service'
import { Observable, BehaviorSubject  } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentsComponent implements OnInit {
  public currentPage: number = 1;
  public parentTransactions$: Observable<ParentTransaction[]> | undefined;
  public isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private readonly parentService: GetParentsAndChildrenService,
  private readonly router: Router) { }

  public ngOnInit(): void {
    this.getParentTransactions();
  }

  private getParentTransactions(currentPage: number = 1): void {
    this.isLoading$.next(true)
    this.parentTransactions$ = this.parentService.getParentTransactions(currentPage).pipe(
      tap(() => this.isLoading$.next(false))
    );
  }

  pageChanged(event?: PageEvent) {
    if (event === undefined) {
      return;
    }

    switch (event.pageIndex) {
      case 0:
        this.firstPage();
        break;
      case 3:
        this.lastPage();
        break;
      default:
        if (event.previousPageIndex !== undefined && event.pageIndex !== undefined) {
          if (event.previousPageIndex > event.pageIndex) {
            this.prevPage();
          } else {
            this.nextPage();
          }
        }
        break;
    }
  }

  private firstPage(): void {
    this.currentPage = 1;
    this.getParentTransactions(this.currentPage);
  }

  private nextPage(): void {
    this.currentPage++;
    this.getParentTransactions(this.currentPage);
  }

  private prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getParentTransactions(this.currentPage);
    }
  }

  private lastPage(): void {
    this.currentPage = 4;
    this.getParentTransactions(this.currentPage);
  }
}
