import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarrasComponent } from './barras/barras.component';


const routes: Routes = [
  {path: '', redirectTo: 'barras', pathMatch: 'full'},
  {path: 'barras', component: BarrasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
