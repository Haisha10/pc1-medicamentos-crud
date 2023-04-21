import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentoComponent } from './medicamento/medicamento.component';

const routes: Routes = [
  { path: '', redirectTo: '/medicamentos', pathMatch: 'full' },
  { path: 'medicamentos', component: MedicamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
