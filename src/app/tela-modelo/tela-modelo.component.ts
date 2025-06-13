import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../services/tela-modelo.service';
import { TelaModelo } from '../models/tela-modelo.model';
import { Marca } from '../models/marca';
import { MarcaService } from '../services/marca.service';
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
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-tela-modelo',
  templateUrl: './tela-modelo.component.html',
  styleUrls: ['./tela-modelo.component.css'],
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
    DropdownModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class TelaModeloComponent implements OnInit {
  dialogTitle: string = 'Modelo';
  modelos: TelaModelo[] = [];
  modeloSelecionado: TelaModelo = { id: 0, nome: '', marca: undefined };
  selectedMarcaId: number | undefined;
  marcas: Marca[] = [];
  displayDialog: boolean = false;

  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarTodos();
    this.listarMarcas();
  }

  listarTodos() {
    this.modeloService.getModelos().subscribe(
      data => {
        // Mapeia propriedade 'marca' do JSON para 'idMarca' do modelo
        this.modelos = data.map(m => ({
          id: m.id,
          nome: m.nome,
          idMarca: (m as any).marca
        } as TelaModelo));
      },
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar modelos.' })
    );
  }

  listarMarcas() {
    this.marcaService.getMarcas().subscribe(
      data => (this.marcas = data),
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar marcas.' })
    );
  }

  showDialogToAdd() {
    this.dialogTitle = 'Novo Modelo';
    this.modeloSelecionado = { id: 0, nome: '', marca: undefined };
    this.selectedMarcaId = undefined;
    this.displayDialog = true;
  }

  editarModelo(modelo: TelaModelo) {
    this.dialogTitle = 'Editar Modelo';
    this.modeloSelecionado = { ...modelo };
    this.selectedMarcaId = modelo.marca?.id;
    this.displayDialog = true;
  }

  salvarModelo() {
    if (!this.modeloSelecionado.nome || !this.modeloSelecionado.marca) {
  this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos.' });
  return;
}

    const payload = {
      nome: this.modeloSelecionado.nome,
      marca: { id: this.selectedMarcaId }
    };


    const operacao = this.modeloSelecionado.id
      ? this.modeloService.updateModelo(this.modeloSelecionado.id, payload)
      : this.modeloService.addModelo(payload);

    operacao.subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: `Modelo ${this.modeloSelecionado.id ? 'atualizado' : 'adicionado'} com sucesso.` });
        this.listarTodos();
        this.displayDialog = false;
        this.selectedMarcaId = undefined;
      },
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar modelo.' })
    );
  }

  cancelDialog() {
    this.displayDialog = false;
    this.modeloSelecionado = { id: 0, nome: '', marca: undefined };
    this.selectedMarcaId = undefined;
  }

  deletarModelo(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este modelo?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modeloService.deleteModelo(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Modelo excluído com sucesso.' });
            this.listarTodos();
          },
          () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir modelo.' })
        );
      }
    });
  }

  deleteFromDialog() {
    if (this.modeloSelecionado.id) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir este modelo?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.modeloService.deleteModelo(this.modeloSelecionado.id!).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Modelo excluído com sucesso.' });
              this.listarTodos();
              this.displayDialog = false;
            },
            () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir modelo.' })
          );
        }
      });
    }
  }
}


