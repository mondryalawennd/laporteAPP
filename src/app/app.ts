import { Component, signal } from '@angular/core';
import { Header } from "./pages/header/header";
import { Footer } from './pages/footer/footer';
import { Nav } from './pages/nav/nav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Nav, Footer, CommonModule],
  templateUrl: "./app.html",
  styles: []  
})


export class App {
   title = 'Laporte Engenharia';
   
}
