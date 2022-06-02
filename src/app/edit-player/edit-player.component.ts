import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['male.png', 'female.png'];

  constructor( public dialogRef: MatDialogRef<EditPlayerComponent> ) { }

  ngOnInit(): void {
  }



}
