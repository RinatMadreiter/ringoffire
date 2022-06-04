import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-share',
  templateUrl: './dialog-share.component.html',
  styleUrls: ['./dialog-share.component.scss']
})
export class DialogShareComponent implements OnInit {

  public path:string = window.location.href;

  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  copyLink(){
    window.location.href;
  }

  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
}

}
