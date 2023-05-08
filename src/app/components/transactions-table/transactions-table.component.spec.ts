import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsTableComponent } from './transactions-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ParentTransaction, ChildTransactions } from '../../services/api.service';

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsTableComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render parent transactions', () => {
    const parentTransactions: ParentTransaction[] = [
      { id: 1, sender: 'John', receiver: 'Alice', totalAmount: 100 },
      { id: 2, sender: 'Bob', receiver: 'Carol', totalAmount: 200 }
    ];

    component.parentTransactions = parentTransactions;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('.parents-table tbody tr');
    expect(tableRows.length).toBe(parentTransactions.length);

    for (let i = 0; i < parentTransactions.length; i++) {
      const tableRow = tableRows[i];
      const transaction = parentTransactions[i];

      expect(tableRow.cells[0].textContent).toContain(transaction.id);
      expect(tableRow.cells[1].textContent).toContain(transaction.sender);
      expect(tableRow.cells[2].textContent).toContain(transaction.receiver);
      expect(tableRow.cells[3].textContent).toContain(transaction.totalAmount);
      expect(tableRow.cells[4].querySelector('a').href).toContain(`/children/${transaction.id}`);
    }
  });

  it('should render child transactions', () => {
    const childTransactions: ChildTransactions[] = [
      { id: 1, parentId: 1, paidAmount: 50 },
      { id: 2, parentId: 1, paidAmount: 30 },
      { id: 3, parentId: 2, paidAmount: 100 }
    ];

    component.childTransactions = childTransactions;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('.children-table tbody tr');
    expect(tableRows.length).toBe(childTransactions.length);

    for (let i = 0; i < childTransactions.length; i++) {
      const tableRow = tableRows[i];
      const transaction = childTransactions[i];

      expect(tableRow.cells[0].textContent).toContain(transaction.id);
      expect(tableRow.cells[1].textContent).toContain(transaction.parentId);
      expect(tableRow.cells[2].textContent).toContain(transaction.paidAmount);
    }
  });
});