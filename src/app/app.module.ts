import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './core/messages/messages.component';
import { ConversationComponent } from './core/conversation/conversation.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { CoreComponent } from './core/core.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ConversationComponent,
    ToolbarComponent,
    LoginComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
