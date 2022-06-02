import { Component, OnInit } from '@angular/core';
// import { collectionData, Firestore } from '@angular/fire/firestore';
import { Firestore, collectionData, addDoc, collection, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  games$: Observable<any>; //define a variable "games" ($is best practice of naming) with the datatype: 
  games: Array<any>;
  gameId: string;
  gameOver: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    //firestore
    const coll = collection(this.firestore, 'games'); // whole collection of firestore database of games defined
    this.games$ = collectionData(coll); //get data from collection (content of games array)

    this.games$.subscribe((game) => { // we need to subscribe to update the information of games database
      console.log('the game update on firestore is ', game);
      this.games = game;
    });
  }



  game: Game; //variable with the type Game


  newGame() {
    this.game = new Game(); // "game" variable gets a new object of Game , empty Game JSON created

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.gameId = params.id;

      // const coll = collection(this.firestore, 'games'); // to use firestore outside the constructor we need to use "this." and insert a "private" or "public" before "firestore"
      docData(doc(this.firestore, 'games', this.gameId)).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
        console.log('the game update on firestore is ', game);
      });
    });
    // console.dir(this.game);
  }


  takeCard() {
    if (this.game.stack.length == 0) {
     this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop(); //retunrs the last card from stack and removes it from there
      // console.log('current Card is ', this.currentCard);
      this.game.pickCardAnimation = true;
      // console.log('played cards are', this.game.playedCards);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        // console.log('The dialog was closed', name);
        // console.table('players are: ',this.game.players);
        this.game.players.push(name);
        this.game.player_images.push('male.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    const coll = doc(this.firestore, 'games', this.gameId);
    updateDoc(coll, this.game.toJson());
  }

  editPlayer(playerId: number) {
    console.log('edit player', playerId);

    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('recieved change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

}
