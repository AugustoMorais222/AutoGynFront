import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoMarcaComponent } from './veiculo-marca.component';

describe('VeiculoMarcaComponent', () => {
  let component: VeiculoMarcaComponent;
  let fixture: ComponentFixture<VeiculoMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiculoMarcaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
