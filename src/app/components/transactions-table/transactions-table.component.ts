import { Component, Input } from '@angular/core';
import { ParentTransaction, ChildTransactions} from '../../services/get-parents-and-children.service'

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  @Input() parentTransactions: ParentTransaction[] | undefined;
  @Input() childTransactions: ChildTransactions[] | undefined;


}
