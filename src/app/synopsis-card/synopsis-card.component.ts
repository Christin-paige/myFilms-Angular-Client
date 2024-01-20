import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Description {
  
  Description: string;
}

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrl: './synopsis-card.component.scss'
})
export class SynopsisCardComponent implements OnInit{

  /**
   * This is the constructor for the component
   * @param data 
   * @returns description of movie
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:{
      
      description: string
    })
    {}

    ngOnInit():void{

    }
}
