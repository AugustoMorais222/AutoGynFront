import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../services/tela-modelo.service';
import { Marca } from '../models/Marca';
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
import { SelectModule } from 'primeng/select';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Modelo } from '../models/Modelo';
import { Observable } from 'rxjs';


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
    SelectModule,
    FloatLabelModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class TelaModeloComponent implements OnInit {
  dialogTitle: string = 'Modelo';
  modelos: Modelo[] = [];
  modeloSelecionado: Modelo = { id: 0, nome: '', marca: undefined };
  selectedMarcaId: number | undefined;
  marca: Marca = {id: 0}
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
        this.modelos = data.map(m => ({
          id: m.id,
          nome: m.nome,
          idMarca: (m as any).marca
        } as Modelo));
      },
      () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar modelos.' })
    );
  }

  listarMarcas() {
    this.marcaService.listarTodos().subscribe({
      next: data => {
        this.marcas = data;
        console.log('>> marcas para dropdown:', this.marcas);
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar marcas.'
        })
    });
  }

  showDialogToAdd() {
    this.dialogTitle = 'Novo Modelo';
    this.modeloSelecionado = { id: 0, nome: '', marca: undefined };
    this.selectedMarcaId = undefined;
    this.displayDialog = true;
  }

  editarModelo(modelo: Modelo) {
    this.dialogTitle = 'Editar Modelo';
    this.modeloSelecionado = {
      id: modelo.id,
      nome: modelo.nome,
      marca: modelo.marca
    };    
    this.selectedMarcaId = modelo.marca?.id;
    this.displayDialog = true;
  }

  salvarModelo() {
    if (!this.modeloSelecionado.nome) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos.'
      });
      return;
    }

    const isEdit = !!this.modeloSelecionado.id;
    const operacao$: Observable<void> = isEdit
      ? this.modeloService.updateModelo(this.modeloSelecionado)
      : this.modeloService.addModelo(this.modeloSelecionado);

    operacao$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: `Modelo ${isEdit ? 'atualizado' : 'adicionado'} com sucesso.`
        });
        this.listarTodos();
        this.displayDialog = false;
        this.selectedMarcaId = undefined;
        this.modeloSelecionado = { id: 0, nome: '', marca: null };
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao ${isEdit ? 'atualizar' : 'adicionar'} modelo.`
        });
      }
    });
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


