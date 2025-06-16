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
import { Servico } from '../models/Servico';
import { ServicosService } from '../services/servicos.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ItensPeca } from '../models/ItensPeca';
import { PecaService } from '../services/peca.service';
import { Peca } from '../models/Peca';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule }  from 'primeng/tabview';
import { SelectModule } from 'primeng/select';
import { Veiculo } from '../models/Veiculo';
import { VeiculoService } from '../services/veiculos.service';
import { ItensServico } from '../models/ItensServico';
import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../models/Funcionario';
import { DatePickerModule } from 'primeng/datepicker';




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
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    FloatLabelModule,
    PickListModule,
    TabViewModule,
    SelectModule,
    DatePickerModule
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
  servicos: Servico[] = [];
  pecas: Peca[] = [];
  veiculos: Veiculo[] = [];
  funcionarios: Funcionario[] = [];
  itensPeca: { precoTotal: number; quantidade: number; peca: Peca; }[] = [];
  itensServico: ItensServico[] = [];

  dataAgora = new Date();
  displayAddServicoDialog = false;
  displayAddPecaDialog = false;

  newItemPeca: { precoTotal: number; quantidade: number; peca: Peca | null } = {
    precoTotal: 0,
    quantidade: 1,
    peca: null,
  };

  newItemServico: ItensServico = {
    servico: undefined,
    funcionario: undefined,
    quantidade: 1,
    horarioInicio: null,
    horarioFim: null,
    precoTotal: 0
  };

  showAddPecaDialog(): void {
    this.newItemPeca = { precoTotal: 0, quantidade: 1, peca: null};
    this.displayAddPecaDialog = true;
  }

  showAddServicoDialog() {
    this.displayAddServicoDialog = true;
  }

  addPeca(): void {
    const peca = this.newItemPeca.peca
    if (!peca) {
      console.log("N deu")
      return;
    }
    const precoUnitario = peca.precoUnitario ?? 0
    console.log("PReco unitario: "+precoUnitario)
    this.newItemPeca.precoTotal = this.newItemPeca.quantidade * precoUnitario;

    this.itensPeca = [
      ...this.itensPeca,
      {
        precoTotal: this.newItemPeca.precoTotal,
        quantidade: this.newItemPeca.quantidade,
        peca: peca,
      },
    ];
    this.displayAddPecaDialog = false;
  }

  addServico() {
    if (this.newItemServico.servico && this.newItemServico.quantidade) {
      this.newItemServico.precoTotal = this.newItemServico.servico.precoUnitario * this.newItemServico.quantidade;
      this.itensServico.push({ ...this.newItemServico });
      this.newItemServico = {
        servico: undefined,
        funcionario: undefined,
        quantidade: 1,
        horarioInicio: null,
        horarioFim: null,
        precoTotal: 0
      };
      this.displayAddServicoDialog = false;
    }
  }

  removePeca(index: number): void {
    this.itensPeca = this.itensPeca.filter((_, i) => i !== index);
  }
  removeServico(index: number) {
    this.itensServico.splice(index, 1);
  }

  constructor(
    private http: HttpClient,
    private ordemServicoService: OrdemServicoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private servicoService: ServicosService,
    private pecaService: PecaService,
    private veiculoService: VeiculoService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {
    this.listarTodos();
    this.loadClientes();
    this.loadVeiculo();
  }

  private loadClientes(): void {
    this.http.get<Cliente[]>('http://localhost:8081/api/clientes').subscribe({
      next: data => this.clientes = data,
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar clientes.'
        })
    });
  }

  private loadServicos(): void {
    this.servicoService.listarTodos().subscribe({
      next: (dados) => {
        this.servicos = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar serviços:', err);
      }
    });
  }

  private loadFuncionarios(): void {
    this.funcionarioService.listarTodos().subscribe({
      next: (dados) => {
        this.funcionarios = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar Funcionários:', err);
      }
    });
  }

  formatDateToBackend(date: Date | null): string | null {
    if (!date) return null;

    const pad = (n: number) => n.toString().padStart(2, '0');

    return date.getFullYear() + '-' +
      pad(date.getMonth() + 1) + '-' +
      pad(date.getDate()) + 'T' +
      pad(date.getHours()) + ':' +
      pad(date.getMinutes()) + ':' +
      pad(date.getSeconds());
  }

  private loadVeiculo(): void {
    this.veiculoService.getVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar veiculo:', err);
      }
    });
  }

  private loadPecas(){
    this.pecaService.listarTodos().subscribe({
      next: (dados) => {
        this.pecas = dados;
        console.log('Peças disponíveis:', this.pecas);
      },
      error: (err) => {
        console.error('Erro ao carregar peças:', err);
      }
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
    this.loadServicos();
    this.loadPecas();
    this.loadFuncionarios();
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
    this.listarItensServico(os.numero)
    this.listarItensPeca(os.numero)
    setTimeout(() => {
      this.displayDialog = true;
    }, 200);
  }

  listarItensServico(numero: number){
    this.ordemServicoService.listarItensServico(numero).subscribe({ 
        next: (data) => {
          this.itensServico = data;
        },
        error: () =>{
           this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Não foi possível buscar os serviços da Ordem de Serviço.'
          });
      return;
        }
      
      })
  }

  listarItensPeca(numero: number){
    this.ordemServicoService.listarItensPeca(numero).subscribe({ 
        next: (data) => {
          this.itensPeca = data;
        },
        error: () =>{
           this.messageService.add({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Não foi possível buscar as peças da Ordem de Serviço.'
          });
      return;
        }
      
      })
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
    const itensComId = this.itensPeca.filter(item => item.peca.id != null);
    const itensServicoComIds = this.itensServico.filter(
      item => item.servico?.id != null && item.funcionario?.id != null
    );

    console.log("Valor status: "+this.ordem.status)
    const dto: OrdemServicoRequest = {
      status: this.ordem.status,
      placaVeiculo: this.ordem.placaVeiculo,
      idCliente: this.ordem.idCliente,
      itensPeca: itensComId.map(item => ({
        quantidade: item.quantidade,
        pecaId: item.peca.id as number,
      })),
      itensServico: itensServicoComIds.map(item => ({
          horarioInicio: this.formatDateToBackend(item.horarioInicio),
          horarioFim: this.formatDateToBackend(item.horarioFim),
          quantidade: item.quantidade,
          funcionarioId: item.funcionario!.id!,
          servicoId: item.servico!.id,
        }))
        
       
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
