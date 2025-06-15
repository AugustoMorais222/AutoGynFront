import { Component, OnInit } from '@angular/core';
import { VeiculoService } from '../services/veiculos.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { ModeloService } from '../services/tela-modelo.service';
import { Marca } from '../models/Marca';
import { Modelo } from '../models/Modelo';
import { Veiculo } from '../models/Veiculo';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-tela-veiculos',
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './tela-veiculos.component.html',
  styleUrls: ['./tela-veiculos.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TelaVeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  modelos: Modelo[] = [];
  marcas: Marca[] = [];
  veiculoForm: FormGroup;
  editMode = false;
  selectedVeiculoId?: string;
  displayDialog = false;
  currentYear = new Date().getFullYear();

  constructor(
    private veiculoService: VeiculoService,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private formBuilder: FormBuilder
  ) {
    this.veiculoForm = this.formBuilder.group({
      placa: [''],
      modelo: [''],
      marca: [''],
      quilometragem: [0],
      chassi: [''],
      patrimonio: [''],
      anoModelo: [0, [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(this.currentYear)]],
      anoFabricacao: [0, [Validators.required, Validators.pattern(/^\d{4}$/), Validators.min(this.currentYear)]],
    });
  }

  ngOnInit() {
    this.loadVeiculos();
    this.loadMarcas();
  }

  loadVeiculos() {
    this.veiculoService.getVeiculos().subscribe({
      next: data => (this.veiculos = data),
      error: () => console.error('Erro ao carregar veículos')
    });
  }

  loadMarcas() {
    this.marcaService.listarTodos().subscribe({
      next: data => {
        this.marcas = data;
        this.loadModelos();
      },
      error: () => console.error('Erro ao carregar marcas')
    });
  }

  loadModelos() {
    this.modeloService.getModelos().subscribe({
      next: data => (this.modelos = data),
      error: () => console.error('Erro ao carregar modelos')
    });
  }

  openDialog() {
    this.editMode = false;
    this.veiculoForm.reset();
    this.displayDialog = true;
  }

  saveVeiculo() {
    const f = this.veiculoForm.value;
    const veiculo: Veiculo = {
      ...f,
      idModelo: { id: f.modelo },
    };
    const obs = this.editMode
      ? this.veiculoService.updateVeiculo(this.selectedVeiculoId!, veiculo)
      : this.veiculoService.addVeiculo(veiculo);
    obs.subscribe({
      next: () => {
        this.loadVeiculos();
        this.closeDialog();
      },
      error: err => console.error(err)
    });
  }

  editVeiculo(v: Veiculo) {
    this.editMode = true;
    this.selectedVeiculoId = v.placa;
    this.veiculoForm.patchValue({
      ...v,
      modelo: v.modelo?.id,
      marca: v.modelo?.marca?.id
    });
    this.displayDialog = true;
  }

  deleteVeiculo(id: string) {
    this.veiculoService.deleteVeiculo(id).subscribe({
      next: () => this.loadVeiculos(),
      error: err => console.error(err)
    });
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
