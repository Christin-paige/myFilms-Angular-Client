import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Genre {
  Name: string;
  Description: string;
  
}

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent implements OnInit {
  /**
   * This is the constructor for the component
   * @param data 
   * @returns Title and Description aka genres name
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:{
      title: string,
      content: string })
  {}
  

  ngOnInit(): void {

  }
}
    
 


