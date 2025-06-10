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
import { Funcionario } from '../models/Funcionario';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FuncionarioService } from '../services/funcionario.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-funcionario',
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
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    DatePickerModule,
    InputMaskModule
  ],
  templateUrl: './funcionario.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './funcionario.component.css'
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado: Funcionario = this.novoFuncionario();
  displayDialog: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.funcionarioService.listarTodos().subscribe({
      next: data => {
        this.funcionarios = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar Funcionários.' });
      }
    });
  }

  salvarFuncionario() {
    if (!this.funcionarioSelecionado.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    const callback = () => {
      this.listarTodos();
      this.displayDialog = false;
      this.funcionarioSelecionado = this.novoFuncionario();
    };

    if (this.funcionarioSelecionado.id) {
      this.funcionarioService.atualizar(this.funcionarioSelecionado.id, this.funcionarioSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário atualizado com sucesso.' });
          callback();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o funcionário.' });
        }
      });
    } else {
      this.funcionarioService.salvar(this.funcionarioSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário salvo com sucesso.' });
          callback();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar o funcionário.' });
        }
      });
    }
  }

  editarFuncionario(funcionario: Funcionario) {
    this.funcionarioSelecionado = { ...funcionario };
    this.displayDialog = true;
  }

  deletarFuncionario(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este funcionário?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.funcionarioService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário excluído com sucesso.' });
            this.listarTodos();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o funcionário.' });
          }
        });
      }
    });
  }

  showDialogToAdd() {
    this.funcionarioSelecionado = this.novoFuncionario();
    this.displayDialog = true;
  }

  private novoFuncionario(): Funcionario {
    return {
      id: 0,
      nome: '',
      salario: 0,
      dataNascimento: '',
      dataAdmissao: '',
      dataDemissao: '',
      cargo: '',
      endereco: '',
      telefone: ''
    };
  }
}
