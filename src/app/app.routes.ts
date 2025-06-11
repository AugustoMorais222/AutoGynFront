import { Routes } from '@angular/router';
import { VeiculoMarcaComponent } from './veiculo-marca/veiculo-marca.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';

export const routes: Routes = [
    {path: 'marcas',component:VeiculoMarcaComponent},
    {path: 'funcionarios',component:FuncionarioComponent},
];
