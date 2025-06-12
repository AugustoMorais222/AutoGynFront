import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autogynfront';
  items: MenuItem[] = [
    { label: 'Marca', routerLink: '/marcas' },
    { label: 'Modelo', routerLink: '/modelos' },
    { label: 'Veículo', routerLink: '/veiculos' },
    { label: 'Serviço', routerLink: '/servicos' },
    { label: 'Peças', routerLink: '/pecas' },
    { label: 'Funcionário', routerLink: '/funcionarios' },
    { label: 'Cliente', routerLink: '/clientes' },
    { label: 'Acessório', routerLink: '/acessorios' },
    { label: 'Ordem Serviço', routerLink: '/ordem-servico' }
  ];
}
