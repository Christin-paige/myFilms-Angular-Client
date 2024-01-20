import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Director { 
  Name: string;
  Bio: string;
  Birth: string;
 
}

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrl: './director-card.component.scss'
})
export class DirectorCardComponent implements OnInit {

   /**
   * This is the constructor for the component
   * @param data 
   * @returns Name, Bio, Birth
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:{
      name: string,
      bio: string,
      birthday: string;
      })
      {}

  ngOnInit(): void {

  }
}

