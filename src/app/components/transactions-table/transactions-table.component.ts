// The code is an Angular component for rendering a table of parent and child transactions.

// The component has two input properties:

// parentTransactions: an array of objects representing parent transactions, where each object has properties id, sender, receiver, totalAmount.

// childTransactions: an array of objects representing child transactions, where each object has properties id, parentId, paidAmount.

/* The component template contains two tables: one for parent transactions and one for child transactions. The *ngIf directives are used to 
  conditionally render each table based on the existence of the corresponding input data.*/

/* The parent transactions table has a header row with column labels and a row for each parent transaction in the input data. The *ngFor directive is used to loop over the 
  parentTransactions array and render a row for each item. The row displays the id, sender, receiver, totalAmount properties of each parent transaction. The last column of the 
  row contains a link that takes the user to a page for viewing the child transactions of the corresponding parent transaction. */

/* The child transactions table has a similar structure to the parent transactions table. The *ngFor directive is used to loop over the childTransactions array and render a row for 
  each item. The row displays the id, parentId, paidAmount properties of each child transaction. */

// The CSS styles define the appearance of the tables and their rows and columns, as well as some styling for the link and button elements used in the component.

// Overall, this component provides a simple and straightforward way to display and navigate between parent and child transaction data in an Angular application.

import { Component, Input } from '@angular/core';
import { ParentTransaction, ChildTransactions} from '../../services/api.service'

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  @Input() parentTransactions: ParentTransaction[] | undefined;
  @Input() childTransactions: ChildTransactions[] | undefined;
}
