import { Component, Input , OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Cargo } from '../Models/Cargo';
import { MatRadioModule } from '@angular/material/radio';
import { FuncionarioDTO } from '../Models/Funcionario';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioTelefoneDTO } from '../Models/FuncionarioTelefone';

@Component({
  selector: 'app-funcionario-create',
  standalone: true,
  imports: [ 
    NgxMaskDirective,
    MatRadioModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './funcionario-create.html',
  styleUrls: ['./funcionario-create.css']
})
export class FuncionarioCreate implements OnInit {
 funcionarioForm!: FormGroup;

 constructor( private route: ActivatedRoute,private fb: FormBuilder, private funcionarioService: FuncionarioService,private router: Router) {
   
  }

  cargoSelecionado = signal<number | null>(null);
  funcionario!: FuncionarioDTO;

  cargos = Object.entries(Cargo)
    .filter(([_, value]) => typeof value === 'number')
    .map(([label, value]) => ({ label, value }));

   funcionarioId: number | null = null;

   ngOnInit(): void {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: [''],
      telefone1: [''],
      telefone2: [''],
      email: [''],
      nomeGerente: [''],
      cargoId: [null, Validators.required],
      senha: ['']
    });

    
    this.route.params.subscribe(params => {
      this.funcionarioId = params['id'];

      if (this.funcionarioId) {
        this.carregarFuncionario(this.funcionarioId);
      }
    });
  }
  
  CriarFuncionario(): void {
    const formValue = this.funcionarioForm.value;

     const funcionarioDTO = {
      id: 0,
      nome: formValue.nome,
      sobrenome: formValue.sobrenome,
      cpf: formValue.cpf,
      dataNascimento: formValue.dataNascimento,
      email: formValue.email,
      nomeGerente: formValue.nomeGerente || null,
      cargoId: formValue.cargoId,
      senha: formValue.senha, 
      telefones:  [] as { numero: string }[]
    };

   if (formValue.telefone1) {
       funcionarioDTO.telefones.push({ numero: formValue.telefone1 });
    }
    if (formValue.telefone2) {
      funcionarioDTO.telefones.push({ numero: formValue.telefone2 });
    }

     this.funcionarioService.cadastrarFuncionario(funcionarioDTO).subscribe({
      next: () => {
      alert('Funcionário cadastrado com sucesso!');
      this.router.navigate(['/funcionario-create']);  
    },
      error: err => alert('Erro ao cadastrar funcionário: ' + err.message)
    });
  }

  salvarFuncionario(): void {
    const formValue = this.funcionarioForm.value;

     const funcionarioDTO = {
      id: 0,
      nome: formValue.nome,
      sobrenome: formValue.sobrenome,
      cpf: formValue.cpf,
      dataNascimento: formValue.dataNascimento,
      email: formValue.email,
      nomeGerente: formValue.nomeGerente || null,
      cargoId: formValue.cargoId,
      senha: formValue.senha, 
      telefones:  [] as { numero: string }[]
    };

   if (formValue.telefone1) {
       funcionarioDTO.telefones.push({ numero: formValue.telefone1 });
    }
    if (formValue.telefone2) {
      funcionarioDTO.telefones.push({ numero: formValue.telefone2 });
    }
    
      if (this.funcionario) {
        // Atualizar funcionário existente
        this.funcionarioService.atualizarFuncionario(this.funcionario.id, formValue).subscribe({
          next: () => {
            alert('Funcionário atualizado com sucesso!');
            this.router.navigate(['/funcionario']);
          },
          error: (err) => {
            console.error('Erro ao atualizar o funcionário: ', err);
          }
        });
      } else {
        // Criar novo funcionário
        this.funcionarioService.cadastrarFuncionario(funcionarioDTO).subscribe({
          next: () => {
             alert('Funcionário cadastrado com sucesso!');
            this.router.navigate(['/funcionario']);
          },
          error: (err) => {
            console.error('Erro ao cadastrar o funcionário: ', err);
            alert('Funcionário cadastrado com sucesso!');
          }
        });
      }
  }

   Cancel(): void {
    this.router.navigate(['/funcionario']);
  }

   carregarFuncionario(funcionarioId: number): void {
    this.funcionarioService.getFuncionarioPorId(funcionarioId).subscribe({
      next: (data) => {
        this.funcionario = data;
        this.funcionarioForm.patchValue({
          id: this.funcionario.id,
          nome: this.funcionario.nome,
          sobrenome: this.funcionario.sobrenome,
          cpf: this.funcionario.cpf,
          dataNascimento: this.funcionario.dataNascimento,
          telefone1: this.funcionario.telefones && this.funcionario.telefones[0] ? this.funcionario.telefones[0].numero : '',  
          telefone2: this.funcionario.telefones && this.funcionario.telefones[1] ? this.funcionario.telefones[0].numero : '',  
          email: this.funcionario.email,
          nomeGerente: this.funcionario.nomeGerente,
          cargoId: this.funcionario.cargoId,
          senha: this.funcionario.senha
        });
      },
      error: (err) => {
        console.error('Erro ao carregar o funcionário: ', err);
      }
    });
  }

  excluirFuncionario(): void {
        this.funcionarioService.deletarFuncionario(this.funcionario.id).subscribe({
          next: () => {
             alert('Funcionário excluído com sucesso!');
            this.router.navigate(['/funcionario']); 
          },
          error: (err) => {
            console.error('Erro ao excluir o funcionário: ', err);
            alert('Erro ao excluir o funcionário!');
          }
        });
  }

}
