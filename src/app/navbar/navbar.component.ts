import { Component, OnInit } from '@angular/core';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router) {}
ngOnInit(): void {

}


}
