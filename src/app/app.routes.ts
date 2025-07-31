import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { funcionario } from './views/funcionario/funcionario';
import { FuncionarioCreate } from './views/funcionario-create/funcionario-create';

export const routes: Routes = [

{
    path: "",
    component: Home
},
  {
    path: "funcionario",
    component: funcionario
  },
  {
    path: "funcionario-create",
    component: FuncionarioCreate
  },
   { path: 'funcionario-create/:id', component: FuncionarioCreate },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
