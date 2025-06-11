import { Routes } from '@angular/router';
import { ServicosComponent } from './servicos/servicos.component';
import { VeiculoMarcaComponent } from './veiculo-marca/veiculo-marca.component';
import { PecaComponent } from './pecas/peca.component';
import { TelaModeloComponent } from './tela-modelo/tela-modelo.component';

export const routes: Routes = [
    {path: 'marcas',component:VeiculoMarcaComponent},
    { path: 'servicos', component: ServicosComponent },
    { path: 'pecas', component: PecaComponent },
    { path: 'modelos', component: TelaModeloComponent }
];
