// ordem-servico.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OrdemServicoService } from '../services/ordemServico.service';
import { OrdemServicoRequest } from '../models/OrdemServicoRequest';
import { OrdemServico } from '../models/OrdemServico';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/Cliente';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule
  ],
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class OrdemServicoComponent implements OnInit {
  ordens: OrdemServico[] = [];
  clientes: Cliente[] = [];
  statusOptions: { label: string; value: string }[] = [
    { label: 'Aberto', value: 'ABERTO' },
    { label: 'Em Andamento', value: 'EM_ANDAMENTO' },
    { label: 'Concluído', value: 'CONCLUIDO' }
  ];
  ordem = {} as Partial<OrdemServicoRequest & { numero: number }>;
  displayDialog = false;
  isEdit = false;

  constructor(
    private http: HttpClient,
    private ordemServicoService: OrdemServicoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarTodos();
    this.loadClientes();
  }

  private loadClientes(): void {
    this.http.get<Cliente[]>('http://localhost:8080/api/clientes').subscribe({
      next: data => this.clientes = data,
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar clientes.'
        })
    });
  }

  listarTodos() {
    this.ordemServicoService.listarTodos().subscribe({
      next: data => this.ordens = data,
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar as ordens de serviço.'
        })
    });
  }

  showDialogToAdd() {
    this.isEdit = false;
    this.ordem = {
      status: '',
      placaVeiculo: '',
      idCliente: 0,
      itensPeca: [],
      itensServico: []
    };
    this.displayDialog = true;
  }

  editar(os: OrdemServico) {
    this.isEdit = true;
    this.ordem = {
      numero: os.numero,
      status: os.status,
      placaVeiculo:
        typeof os.placaVeiculo === 'string'
          ? os.placaVeiculo
          : os.placaVeiculo.placa,
      idCliente: os.cliente.id,
      itensPeca: [],
      itensServico: []
    };
    this.displayDialog = true;
  }

  salvar() {
    if (!this.ordem.status || !this.ordem.placaVeiculo || !this.ordem.idCliente) {
      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios.'
      });
      return;
    }

    const dto: OrdemServicoRequest = {
      status: this.ordem.status,
      placaVeiculo: this.ordem.placaVeiculo,
      idCliente: this.ordem.idCliente,
      itensPeca: this.ordem.itensPeca!,
      itensServico: this.ordem.itensServico!
    };

    if (this.isEdit && this.ordem.numero != null) {
      this.ordemServicoService.atualizar(this.ordem.numero, dto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Ordem de serviço atualizada.'
          });
          this.listarTodos();
          this.displayDialog = false;
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao atualizar ordem de serviço.'
          })
      });
    } else {
      this.ordemServicoService.criar(dto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Ordem de serviço criada.'
          });
          this.listarTodos();
          this.displayDialog = false;
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao criar ordem de serviço.'
          })
      });
    }
  }

  deletar(numero: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta ordem?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordemServicoService.deletar(numero).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Ordem excluída.'
            });
            this.listarTodos();
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir.'
            })
        });
      }
    });
  }

  downloadPdf(numero: number): void {
    this.ordemServicoService
      .pegarPdf(numero)
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ordem-servico-${numero}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
}
