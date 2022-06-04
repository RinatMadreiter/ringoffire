import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, addDoc, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {


  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    // Start game
    let game = new Game();
    const coll = collection(this.firestore, 'games'); // to use firestore outside the constructor we need to use "this." and insert a "private" or "public" before "firestore"
    addDoc(coll, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl("/game/" + gameInfo.id);
    });
  }

}
