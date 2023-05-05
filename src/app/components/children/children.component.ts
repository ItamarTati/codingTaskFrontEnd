import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetParentsAndChildrenService, ChildTransactions } from '../../services/get-parents-and-children.service'
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
      private childrenService: GetParentsAndChildrenService
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
     this.childTransactions$ = this.childrenService.getChildTransactions(parentId).pipe(
       tap(() => this.isLoading$.next(false))
     );
   }
}
