import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FuncionarioDTO } from '../Models/Funcionario';


@Injectable({
 providedIn: 'root'
})

export class FuncionarioService {

private baseUrl = 'https://localhost:7084/api/Funcionario';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

   getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllFuncionarios`);
  }
   

 cadastrarFuncionario(funcionario: FuncionarioDTO): Observable<any> {
return this.http.post(`${this.baseUrl}/CadastrarFuncionario`, funcionario);
  }
}
