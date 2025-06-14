import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule
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
