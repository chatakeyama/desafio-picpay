import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntlPt } from './share/mat-paginator-intl-pt';

import { ToastrModule } from 'ngx-toastr';
import { NgxCurrencyModule } from "ngx-currency";

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { HeaderComponent } from './components/template/header/header.component';
import { DialogManagerComponent } from './components/meus-pagamentos/dialog-manager/dialog-manager.component';
import { DialogTemplateComponent } from './components/meus-pagamentos/dialog-template/dialog-template.component';
import { MeusPagamentosComponent } from './components/meus-pagamentos/meus-pagamentos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VisibleOnHoverDirective } from './directives/visible-on-hover.directive';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    MeusPagamentosComponent,
    DateFormatPipe,
    VisibleOnHoverDirective,
    DialogManagerComponent,
    DialogTemplateComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPt }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
