import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent, ExcelModule  } from '@progress/kendo-angular-grid';
import { filterBy, process, State  } from "@progress/kendo-data-query";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";

const distinct = data =>
  data
    .map(x => x.title)
    .filter(
      (x, idx, xs) =>
        xs.findIndex(y => y.title === x.title) === idx
    );

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
      Total Records: {{gridView.total}}  
      <kendo-grid
          [data]="gridView"
          [skip]="state.skip"
          [pageSize]="pageSize"
          scrollable="virtual"
          [rowHeight]="36"
          [height]="940"
          (pageChange)="pageChange($event)"
          [navigable]="true"
          [filterable]="true"
          [filter]="state.filter"
          [sortable]="true"
          [sort]="state.sort"
          [reorderable]="true"
          [resizable]="true"
          (dataStateChange)="dataStateChange($event)"
        >
        <ng-template kendoGridToolbarTemplate>
        <button type="button" kendoGridExcelCommand icon="file-excel">
          Export to Excel
        </button>
      </ng-template>
        <kendo-grid-column field="id" [width]="180" title="ID"></kendo-grid-column>
        <kendo-grid-column field="firstName" title="First Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="lastName" title="Last Name" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="city" title="City" [width]="130"></kendo-grid-column>
        <kendo-grid-column field="title" title="Title" [width]="180">
        <ng-template kendoGridFilterCellTemplate let-filter>
            <my-dropdown-filter
            [filter]="filter"
            [data]="distinctTitles"
            textField="title"
            valueField="title"
            >
            </my-dropdown-filter>
      </ng-template>
        
        </kendo-grid-column>
        <kendo-grid-excel fileName="Products.xlsx"></kendo-grid-excel>
      </kendo-grid>
  `
})
export class AppComponent {
    public data: unknown[];
    public pageSize = 100;
    public skip = 0;
    public state: State = {
        skip: 0,
        take: 5,
        sort: [],
        group: [],
        filter: {
            logic: "and",
            filters: [],
        },
    };
    public filter: CompositeFilterDescriptor = { filters: [], logic: "and" };
    public distinctTitles: any[];
    public gridView: GridDataResult; //= process(this.createRandomData(100000), this.state);
    
    constructor() {
        this.data = this.createRandomData(100000);
        //console.log(this.data)
        this.distinctTitles = distinct(this.data)
        console.log('titles', this.distinctTitles)
        this.loadProducts();
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridView = process(this.data, this.state);
      }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        console.log('new page')
        //this.loadProducts();
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
