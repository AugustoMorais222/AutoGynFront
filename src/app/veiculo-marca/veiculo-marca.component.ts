import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/Marca';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-veiculo-marca',
  imports: [
    PanelModule,
    CommonModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    FormsModule,
    InputNumberModule,
    FloatLabelModule
  ],
  templateUrl: './veiculo-marca.component.html',
  styleUrl: './veiculo-marca.component.css',
  providers: [MessageService, ConfirmationService]
})
export class VeiculoMarcaComponent implements OnInit{
  marcas: Marca[] = [];
  marcaSelecionada: Marca = { id: 0, nome: ''};
  displayDialog: boolean = false;

  constructor(
    private marcaService: MarcaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.marcaService.listarTodos().subscribe({
      next: data => {
        this.marcas = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar Marcas.' });
      }
    });
  }

  salvarMarca() {
    if (!this.marcaSelecionada.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos.' });
      return;
    }
  
    if (this.marcaSelecionada.id) {
      this.marcaService.atualizar(this.marcaSelecionada.id, this.marcaSelecionada).subscribe({
        next:() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'marca atualizada com sucesso.' });
          this.listarTodos();
          this.displayDialog = false;
          this.marcaSelecionada = { id: 0, nome: ''};
        },
        error:() => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a marca.' });
        }
      });
    } else {
      this.marcaService.salvar(this.marcaSelecionada).subscribe({
        next:() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'marca salva com sucesso.' });
          this.listarTodos();
          this.displayDialog = false;
          this.marcaSelecionada = { id: 0, nome: ''};
        },
        error:() => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar a marca.' });
        }
      });
    }
  }
  

  editarMarca(marca: Marca) {
    this.marcaSelecionada = { ...marca };
    this.displayDialog = true;
  }

  deletarMarca(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta marca?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.marcaService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'marca excluída com sucesso.' });
            this.listarTodos();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir a marca.' });
          }
        });
      }
    });
  }
  

  showDialogToAdd() {
    this.marcaSelecionada = { id: 0, nome: '' };
    this.displayDialog = true;
  }
}
