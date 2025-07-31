import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatCardTitle, MatCardSubtitle } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCard, MatCardTitle, MatCardSubtitle],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
