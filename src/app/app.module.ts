import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './core/messages/messages.component';
import { ConversationComponent } from './core/conversation/conversation.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ConversationComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
