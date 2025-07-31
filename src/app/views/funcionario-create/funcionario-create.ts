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

 constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService,private router: Router) {
   
  }

  cargoSelecionado = signal<number | null>(null);

  cargos = Object.entries(Cargo)
    .filter(([_, value]) => typeof value === 'number')
    .map(([label, value]) => ({ label, value }));

  
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
  }
  
  CriarFuncionario(): void {
    const formValue = this.funcionarioForm.value;

     const funcionarioDTO = {
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

   Cancel(): void {
    this.router.navigate(['/funcionario']);
  }
}
