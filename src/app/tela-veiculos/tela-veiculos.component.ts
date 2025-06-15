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
import { VeiculoService } from '../services/veiculos.service';
import { MarcaService } from '../services/marca.service';
import { ModeloService } from '../services/tela-modelo.service';
import { Veiculo } from '../models/Veiculo';
import { Marca } from '../models/Marca';
import { Modelo } from '../models/Modelo';

@Component({
  standalone: true,
  selector: 'app-tela-veiculos',
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
  templateUrl: './tela-veiculos.component.html',
  styleUrls: ['./tela-veiculos.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TelaVeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  modelos: Modelo[] = [];
  marcas: Marca[] = [];
  marcaSelecionadaId?: number;
  veiculoSelecionado: Veiculo = this.criarVeiculoVazio();
  editMode = false;
  displayDialog = false;
  currentYear = new Date().getFullYear();

  constructor(
    private veiculoService: VeiculoService,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadVeiculos();
    this.loadMarcas();
  }

  private criarVeiculoVazio(): Veiculo {
    return {
      placa: '',
      quilometragem: 0,
      chassi: '',
      patrimonio: '0',
      anoModelo: this.currentYear,
      anoFabricacao: this.currentYear,
      modelo: undefined
    };
  }

  onMarcaChange(marcaId: number) {
    this.marcaSelecionadaId = marcaId;
    this.veiculoSelecionado.modelo = undefined;
    this.loadModelos(marcaId);
  }

  loadVeiculos() {
    this.veiculoService.getVeiculos().subscribe({
      next: data => {
        this.veiculos = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar veículos.' });
      }
    });
  }

  loadMarcas() {
    this.marcaService.listarTodos().subscribe({
      next: data => {
        this.marcas = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar marcas.' });
      }
    });
  }

  loadModelos(marcaId: number) {
    this.modeloService.findByMarca(marcaId).subscribe({
      next: data => {
        this.modelos = data;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar modelos.' });
      }
    });
  }

  showDialogToAdd() {
    this.editMode = false;
    this.veiculoSelecionado = this.criarVeiculoVazio();
    this.modelos = [];
    this.displayDialog = true;
  }

  editVeiculo(v: Veiculo) {
    this.editMode = true;
    const modeloExistente = v.modelo ?? { id: 0, nome: '', marca: { id: 0, nome: '' } };

    this.veiculoSelecionado = {
      ...v,
      modelo: {
        id: modeloExistente.id,
        nome: modeloExistente.nome,
        marca: {
          id: modeloExistente.marca?.id ?? 0,
          nome: modeloExistente.marca?.nome ?? ''
        }
      }
    };

    const marcaId = modeloExistente.marca?.id;
    if (marcaId) {
      this.loadModelos(marcaId);
    } else {
      this.modelos = [];
    }

    this.displayDialog = true;
  }

  saveVeiculo() {
    const placa     = this.veiculoSelecionado.placa;
    const modeloId  = this.veiculoSelecionado.modelo?.id;
    const anoMod    = this.veiculoSelecionado.anoModelo ?? 0;
    const anoFab    = this.veiculoSelecionado.anoFabricacao ?? 0;

    if (!placa || !modeloId || anoMod < this.currentYear || anoFab < this.currentYear) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente.' });
      return;
    }

    const obs = this.editMode
      ? this.veiculoService.updateVeiculo(placa, this.veiculoSelecionado)
      : this.veiculoService.addVeiculo(this.veiculoSelecionado);

    obs.subscribe({
      next: () => {
        this.loadVeiculos();
        this.displayDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: this.editMode ? 'Atualizado' : 'Adicionado',
          detail: `Veículo ${placa} ${this.editMode ? 'atualizado' : 'cadastrado'} com sucesso.`
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Falha ao ${this.editMode ? 'atualizar' : 'cadastrar'} veículo.`
        });
      }
    });
  }

  deleteVeiculo(id: string) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este veículo?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.veiculoService.deleteVeiculo(id).subscribe({
          next: () => {
            this.loadVeiculos();
            this.messageService.add({ severity: 'success', summary: 'Excluído', detail: 'Veículo excluído com sucesso.' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir veículo.' });
          }
        });
      }
    });
  }
}
