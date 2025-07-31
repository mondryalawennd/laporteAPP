import { Component, ChangeDetectorRef, OnInit    } from '@angular/core';
import { MatCardActions } from "@angular/material/card";
import { FuncionarioService } from './funcionario.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FuncionarioDTO } from '../Models/Funcionario';
import { CommonModule } from '@angular/common';
import { CargoNomePipe } from './cargo.pipe';

@Component({
  selector: 'app-funcionario',
  imports: [MatCardActions,MatButtonModule, MatCardModule, CommonModule,CargoNomePipe],
  templateUrl: './funcionario.html',
  styleUrls: ['./funcionario.css']
})

export class funcionario implements  OnInit {
   
 funcionarios$: any[] = [];
 displayedColumns: string[] = ['nome', 'sobrenome', 'cargo'];


constructor(private router: Router,private funcionarioService: FuncionarioService, private cdRef: ChangeDetectorRef ) {  }

 ngOnInit() {
    this.loadFuncionarios();
  }

  loadFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (data) => {
        this.funcionarios$ =  data;
        
        console.log(this.funcionarios$ )
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar funcionários', error);
      }
    });
  }

   addFuncionario(): void {
   this.router.navigate(['/funcionario-create']);
  }

}
