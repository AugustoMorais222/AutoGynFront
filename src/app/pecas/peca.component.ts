import { Component, OnInit } from '@angular/core';
import { PecaService } from '../services/peca.service';
import { Peca } from '../models/peca.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-peca',
  templateUrl: './peca.component.html',
  styleUrls: ['./peca.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PecaComponent implements OnInit {
  dialogTitle: string = 'Peça';
  pecas: Peca[] = [];
  pecaSelecionada: Peca = { id: 0, codigo: '', nome: '', precoUnitario: 0, quantidade: 0 };
  displayDialog: boolean = false;

  constructor(
    private pecaService: PecaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.pecaService.listarTodos().subscribe(
      data => (this.pecas = data),
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar peças.' })
    );
  }

  showDialogToAdd() {
    this.dialogTitle = 'Nova Peça';
    this.pecaSelecionada = { id: 0, codigo: '', nome: '', precoUnitario: 0, quantidade: 0 };
    this.displayDialog = true;
  }

  editarPeca(peca: Peca) {
    this.dialogTitle = 'Editar Peça';
    this.pecaSelecionada = { ...peca };
    this.displayDialog = true;
  }

  salvarPeca() {
    if (!this.pecaSelecionada.codigo || !this.pecaSelecionada.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos obrigatórios.' });
      return;
    }
    const operacao = this.pecaSelecionada.id
      ? this.pecaService.atualizar(this.pecaSelecionada.id!, this.pecaSelecionada)
      : this.pecaService.salvar(this.pecaSelecionada);
    operacao.subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Peça ${this.pecaSelecionada.id ? 'atualizada' : 'salva'} com sucesso.` });
        this.listarTodos();
        this.displayDialog = false;
      },
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar a peça.' })
    );
  }

  cancelDialog() {
    this.displayDialog = false;
    this.pecaSelecionada = { id: 0, codigo: '', nome: '', precoUnitario: 0, quantidade: 0 };
  }

  deletarPeca(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta peça?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pecaService.deletar(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Peça excluída com sucesso.' });
            this.listarTodos();
          },
          () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir a peça.' })
        );
      }
    });
  }

  deleteFromDialog() {
    if (this.pecaSelecionada.id) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir esta peça?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pecaService.deletar(this.pecaSelecionada.id!).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Peça excluída com sucesso.' });
              this.listarTodos();
              this.displayDialog = false;
            },
            () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir a peça.' })
          );
        }
      });
    }
  }
}
