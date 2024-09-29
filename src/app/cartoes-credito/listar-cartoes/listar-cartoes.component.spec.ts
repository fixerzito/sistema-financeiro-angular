import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCartoesComponent } from './listar-cartoes.component';

describe('ListarCartoesComponent', () => {
  let component: ListarCartoesComponent;
  let fixture: ComponentFixture<ListarCartoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCartoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCartoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
