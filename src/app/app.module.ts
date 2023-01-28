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
import { BetterDatePipe } from './betterdate.pipe';
import { UrlPipe } from './url.pipe';
import { CdsModule } from '@cds/angular';

@NgModule({
  declarations: [
    AppComponent,
    ViewFriendlyPipe,
    BioComponent,
    DatagridComponent,
    TextComponent,
    RankComponent,
    CardComponent,
    BetterDatePipe,
    UrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    ApiModule,
    CdsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
