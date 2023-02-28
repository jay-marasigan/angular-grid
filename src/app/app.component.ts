import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'my-app',
    /*
     * Set a fixed row height of 36px (20px line height, 2 * 8px padding)
     *
     * [row height] = [line height] + [padding] + [border]
     *
     * Note: If using the Kendo UI Material theme, add 1px to the row height
     * to account for the bottom border width.
     */
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .k-grid tbody td {
            white-space: nowrap;
            line-height: 20px;
            padding: 8px 12px;
        }
    `],
    template: `
      <kendo-grid
          [data]="gridView"
          [skip]="skip"
          [pageSize]="pageSize"
          scrollable="virtual"
          [rowHeight]="36"
          [height]="940"
          (pageChange)="pageChange($event)"
          [navigable]="true"
        >
        <kendo-grid-column field="id" [width]="80" title="ID"></kendo-grid-column>
        <kendo-grid-column field="firstName" title="First Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="lastName" title="Last Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="city" title="City" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="title" title="Title" [width]="180"></kendo-grid-column>
      </kendo-grid>
  `
})
export class AppComponent {
    public gridView: GridDataResult;
    public data: unknown[];
    public pageSize = 100;
    public skip = 0;

    constructor() {
        this.data = this.createRandomData(100000);
        this.loadProducts();
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        console.log('new page')
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: this.data.slice(this.skip, this.skip + this.pageSize),
            total: this.data.length
        };
    }

    /* Generating example data */
    private createRandomData(count: number): unknown[] {
        const firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Nige'],
            lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan', 'Suyama', 'King', 'Callahan', 'Dodsworth', 'White'],
            cities = ['Seattle', 'Tacoma', 'Kirkland', 'Redmond', 'London', 'Philadelphia', 'New York', 'Seattle', 'London', 'Boston'],
            titles = ['Accountant', 'Vice President, Sales', 'Sales Representative', 'Technical Support', 'Sales Manager', 'Web Designer',
                'Software Developer'];

        return Array(count).fill({}).map((_, idx) => ({
            id: idx + 1,
            firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            title: titles[Math.floor(Math.random() * titles.length)]
        })
        );
    }
}
