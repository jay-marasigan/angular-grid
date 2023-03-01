import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AppComponent } from './app.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DropDownListFilterComponent } from './dropdownlist-filter.component';

@NgModule({
    imports: [
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            GridModule,
            ExcelModule,
            ButtonsModule,
            InputsModule,
            DropDownListModule
        ],
    declarations: [ AppComponent, DropDownListFilterComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
