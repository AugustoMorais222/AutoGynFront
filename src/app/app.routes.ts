import { Routes } from '@angular/router';
import { ServicosComponent } from './servicos/servicos.component';
import { VeiculoMarcaComponent } from './veiculo-marca/veiculo-marca.component';
import { PecaComponent } from './pecas/peca.component';

export const routes: Routes = [
    {path: 'marcas',component:VeiculoMarcaComponent},
    { path: 'servicos', component: ServicosComponent },
    { path: 'pecas', component: PecaComponent }
];
