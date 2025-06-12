import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-cliente',
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
    SelectModule,
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
  templateUrl: './cliente.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente = this.novoCliente();
  displayDialog: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  tiposClientes = [
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' }
  ];

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.clienteService.listarTodos().subscribe({
      next: data => {
        this.clientes = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar Clientes.' });
      }
    });
  }

  salvarCliente() {
    if (!this.clienteSelecionado.nome) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    const callback = () => {
      this.listarTodos();
      this.displayDialog = false;
      this.clienteSelecionado = this.novoCliente();
    };

    if (this.clienteSelecionado.id) {
      this.clienteService.atualizar(this.clienteSelecionado.id, this.clienteSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente atualizado com sucesso.' });
          callback();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o cliente.' });
        }
      });
    } else {
      this.clienteService.salvar(this.clienteSelecionado).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente salvo com sucesso.' });
          callback();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar o cliente.' });
        }
      });
    }
  }

  editarCliente(cliente: Cliente) {
    this.clienteSelecionado = { ...cliente };
    this.displayDialog = true;
  }

  deletarCliente(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este cliente?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.deletar(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente excluído com sucesso.' });
            this.listarTodos();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o cliente.' });
          }
        });
      }
    });
  }

  showDialogToAdd() {
    this.clienteSelecionado = this.novoCliente();
    this.displayDialog = true;
  }

  private novoCliente(): Cliente {
    return {
      id: 0,
      nome: '',
      endereco: '',
      cep: '',
      tipoCliente: '',
      email: '',
      complemento: '',
      cpf: '',
      cnpj: '',
      inscricaoEstadual: '',
      contato: '',
      numero1: 0,
      numero2: 0
    };
  }
  
  formatarCPF_CNPJ(cpf: string, cnpj: string): string {

    if(cpf.length > 0){
      return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
    if (cnpj.length > 0) {
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    return '-';
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';
  
    const nums = telefone.replace(/\D/g, '');
  
    if (nums.length === 10) {
      return nums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      
    } else if (nums.length === 11) {

      return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {

      return telefone;
    }
  }
}
