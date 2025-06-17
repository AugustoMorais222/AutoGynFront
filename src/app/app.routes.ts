import { Routes } from '@angular/router';
import { VeiculoMarcaComponent } from './veiculo-marca/veiculo-marca.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { AcessorioComponent } from './acessorios/acessorio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { TelaVeiculosComponent } from './tela-veiculos/tela-veiculos.component';
import { TelaModeloComponent } from './tela-modelo/tela-modelo.component';
import { ServicosComponent } from './servicos/servicos.component';
import { PecaComponent } from './pecas/peca.component';

export const routes: Routes = [
    { path: 'marcas', component: VeiculoMarcaComponent },
    { path: 'funcionarios', component: FuncionarioComponent },
    { path: 'acessorios', component: AcessorioComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'ordem-servico', component: OrdemServicoComponent },
    { path: 'veiculos', component: TelaVeiculosComponent }, 
    { path: 'modelos', component: TelaModeloComponent },
    { path: 'servicos', component: ServicosComponent },
    { path: 'pecas', component: PecaComponent }
];
