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
import { AcessoriosService } from '../services/acessorio.service';
import { Acessorio } from '../models/Acessorios';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-acessorio',
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
  templateUrl: './acessorios.component.html',
  styleUrl: './acessorios.component.css',
  providers: [MessageService, ConfirmationService]
})
export class AcessorioComponent implements OnInit{
  acessorios: Acessorio[] = [];
  acessorioSelecionada: Acessorio = { id: 0, nome: ''};
  displayDialog: boolean = false;

  constructor(
    private acessorioService: AcessoriosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.acessorioService.listarTodos().subscribe({
      next: data => {
        this.acessorios = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar Acessorios.' });
      }
    });
  }

  salvarAcessorio() {
    if (!this.acessorioSelecionada.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos.' });
      return;
    }
  
    if (this.acessorioSelecionada.id) {
      this.acessorioService.atualizar(this.acessorioSelecionada.id, this.acessorioSelecionada).subscribe({
        next:() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'acessorio atualizada com sucesso.' });
          this.listarTodos();
          this.displayDialog = false;
          this.acessorioSelecionada = { id: 0, nome: ''};
        },
        error:() => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a acessorio.' });
        }
      });
    } else {
      this.acessorioService.salvar(this.acessorioSelecionada).subscribe({
        next:() => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'acessorio salva com sucesso.' });
          this.listarTodos();
          this.displayDialog = false;
          this.acessorioSelecionada = { id: 0, nome: ''};
        },
        error:() => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar a acessorio.' });
        }
      });
    }
  }
  

  editarAcessorio(acessorio: Acessorio) {
    this.acessorioSelecionada = { ...acessorio };
    this.displayDialog = true;
  }

  deletarAcessorio(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta acessorio?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.acessorioService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'acessorio excluída com sucesso.' });
            this.listarTodos();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir a acessorio.' });
          }
        });
      }
    });
  }
  

  showDialogToAdd() {
    this.acessorioSelecionada = { id: 0, nome: '' };
    this.displayDialog = true;
  }
}
