import { Component } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  imports: [MatSidenav, MatSidenavContainer, MatSidenav, MatNavList, MatSidenavContent, RouterOutlet,RouterLink]
})
export class Nav {
  constructor(){}

  ngOnInit(): void {
    
  }
}
