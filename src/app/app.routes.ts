import { Routes } from '@angular/router';
import { VeiculoMarcaComponent } from './veiculo-marca/veiculo-marca.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { AcessorioComponent } from './acessorios/acessorio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';

export const routes: Routes = [
    { path: 'marcas', component: VeiculoMarcaComponent },
    { path: 'funcionarios', component: FuncionarioComponent },
    { path: 'acessorios', component: AcessorioComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'ordem-servico', component: OrdemServicoComponent }

];
