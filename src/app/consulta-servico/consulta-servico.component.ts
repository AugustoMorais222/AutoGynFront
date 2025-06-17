import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ConsultaService, ItensServicoResponse } from '../services/consulta.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consulta-servicos',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    CommonModule,
    TableModule,
    PanelModule,
    TagModule,
    MessageModule
  ],
  providers: [DatePipe],
  template: `
    <div class="w-full p-fluid">
      <p-card header="Consulta de Serviços" class="w-full" [style]="{'margin': '0 auto'}">
        <div class="grid">
          <div class="col-12 md:col-10">
            <span class="p-float-label w-full">
              <input 
                id="consulta" 
                type="text" 
                pInputText 
                [(ngModel)]="consulta" 
                class="w-full" 
              />
              <label for="consulta">Digite sua consulta (ex: serviços de Janeiro, serviços do "Joao" em Janeiro, serviços do "Joao" + serviços da "Maria")</label>
            </span>
          </div>
          <div class="col-12 md:col-2 flex align-items-center">
            <p-button 
              label="Consultar" 
              (onClick)="executarConsulta()" 
              class="w-full" 
            />
          </div>
        </div>

        <!-- Mensagem de erro -->
        <p-message 
          *ngIf="erro" 
          severity="error" 
          [text]="erro" 
          [closable]="true"
          (onClose)="erro = ''"
          class="mt-3 w-full"
        ></p-message>

        <p-panel [header]="'Resultados '+resultados.length" [toggleable]="true" *ngIf="resultados.length > 0" class="mt-4 w-full">
          <p-table 
            [value]="resultados" 
            [paginator]="true" 
            [rows]="5" 
            styleClass="p-datatable-striped p-datatable-gridlines w-full"
            [rowsPerPageOptions]="[5,10,20]"
            [scrollable]="true"
            scrollHeight="flex"
          >
            <ng-template pTemplate="header">
              <tr>
                <th style="width: 8%">OS</th>
                <th style="width: 12%">Cliente</th>
                <th style="width: 8%">Veículo</th>
                <th style="width: 18%">Serviço</th>
                <th style="width: 15%">Funcionário</th>
                <th style="width: 6%">Qtd</th>
                <th style="width: 10%">Valor Total</th>
                <th style="width: 15%">Horário</th>
                <th style="width: 8%">Status</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr>
                <td>{{item.numeroOs || '-'}}</td>
                <td>{{item.clienteNome || '-'}}</td>
                <td>{{item.placaVeiculo || '-'}}</td>
                <td>{{item.servicoNome}} ({{item.servicoPrecoUnitario | currency:'BRL'}})</td>
                <td>{{item.funcionarioNome}} ({{item.funcionarioCargo}})</td>
                <td>{{item.quantidade}}</td>
                <td>{{item.precoTotal | currency:'BRL'}}</td>
                <td>
                  <div *ngIf="item.horarioInicio > 0">
                    <div>Início: {{item.horarioInicio | date:'dd/MM/yy HH:mm'}}</div>
                    <div *ngIf="item.horarioFim > 0">Fim: {{item.horarioFim | date:'dd/MM/yy HH:mm'}}</div>
                    <div *ngIf="item.horarioFim <= 0">Em andamento</div>
                  </div>
                  <div *ngIf="item.horarioInicio <= 0">
                    Não iniciado
                  </div>
                </td>
                <td>
                  <p-tag 
                    [value]="item.statusOs || '-'"
                    [severity]="getSeverity(item.statusOs)"
                    class="w-full"
                  />
                </td>
              </tr>
            </ng-template>
          </p-table>
        </p-panel>
      </p-card>
    </div>
  `
})
export class ConsultaServicoComponent {
  consulta: string = '';
  resultados: ItensServicoResponse[] = [];
  erro: string = '';

  constructor(
    private datePipe: DatePipe, 
    private consultaService: ConsultaService
  ) {}

  getSeverity(status: string | undefined) {
    if (!status) return 'info';
    
    switch (status.toLowerCase()) {
      case 'finalizado': return 'success';
      case 'andamento': return 'warning';
      case 'pendente': return 'danger';
      default: return 'info';
    }
  }

  formatDate(timestamp: number): string {
    if (timestamp <= 0) return '-';
    return this.datePipe.transform(timestamp, 'dd/MM/yyyy HH:mm') || '-';
  }

  executarConsulta() {
    this.erro = ''; 
    this.resultados = [];

    this.consultaService.consultar(this.consulta).subscribe({
      next: (resultados) => {
        this.resultados = resultados;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 500) {
          try {
            const errorBody = err.error;
            this.erro = errorBody.message || 'Erro interno no servidor';
          } catch (e) {
            this.erro = 'Erro ao processar resposta do servidor';
          }
          return;
        } 
        this.erro = `Erro ${err.status}: ${err.statusText}`;
      }
    });
  }
}