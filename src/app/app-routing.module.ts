import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CoreComponent } from './core/core.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "chat", component: CoreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
