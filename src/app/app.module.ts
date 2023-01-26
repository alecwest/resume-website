import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewFriendlyPipe } from './view-friendly.pipe';
import { ApiModule } from './api/v1';
import { BioComponent } from './bio/bio.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { TextComponent } from './text/text.component';
import { RankComponent } from './rank/rank.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewFriendlyPipe,
    BioComponent,
    DatagridComponent,
    TextComponent,
    RankComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
