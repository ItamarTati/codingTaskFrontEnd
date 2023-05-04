import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GetParentsAndChildrenService, ParentTransaction } from '../../services/get-parents-and-children.service';
import { ParentsComponent } from './parents.component';

describe('ParentsComponent', () => {
  let component: ParentsComponent;
  let fixture: ComponentFixture<ParentsComponent>;
  let mockParentService: jasmine.SpyObj<GetParentsAndChildrenService>;

  beforeEach(() => {
    mockParentService = jasmine.createSpyObj(['getParentTransactions']);

    TestBed.configureTestingModule({
      declarations: [ParentsComponent],
      imports: [MatPaginatorModule, MatProgressSpinnerModule],
      providers: [{ provide: GetParentsAndChildrenService, useValue: mockParentService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentsComponent);
    component = fixture.componentInstance;
  });

  it('should display loading spinner when loading', () => {
    mockParentService.getParentTransactions.and.returnValue(of([]));
    component.isLoading$.next(true);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-container'));
    expect(spinner).toBeTruthy();
  });

  it('should not display loading spinner when not loading', () => {
    mockParentService.getParentTransactions.and.returnValue(of([]));
    component.isLoading$.next(false);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-container'));
    expect(spinner).toBeFalsy();
  });

  it('should display parent transactions when not loading', () => {
    const parentTransactions: ParentTransaction[] = [
      { id: 1, sender: 'Alice', receiver: 'Bob', totalAmount: 100 },
      { id: 2, sender: 'Charlie', receiver: 'David', totalAmount: 200 },
    ];
    mockParentService.getParentTransactions.and.returnValue(of(parentTransactions));
    component.isLoading$.next(false);
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.parents-table tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('1');
    expect(rows[1].nativeElement.textContent).toContain('Charlie');
  });

  it('should call getParentTransactions with correct page number when pageChanged event is emitted', () => {
    mockParentService.getParentTransactions.and.returnValue(of([]));
    const event = { pageIndex: 2 } as any;
    spyOn(component, 'getParentTransactions');
    component.pageChanged(event);
    expect(component.getParentTransactions).toHaveBeenCalledWith(3);
  });
});
