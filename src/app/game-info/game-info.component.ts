import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Ace is for all.', description: 'Everyone must say a verb.' },
    { title: '2 is for you.', description: 'The student selects another student in the class to say a noun.' },
    { title: '3 is for me.', description: 'The student who selects the card must say a verb.' },
    { title: '4 is for the floor.', description: 'Everyone must quickly touch the floor. The last student to touch the floor must say a noun.' },
    { title: '5 is for guys.', description: 'All of the male students must say a noun.' },
    { title: '6 is for ladies', description: 'All of the female students must say a noun.' },
    { title: '7 is for heaven.', description: 'Everyone must quickly put their hands in the air. The last student to put their hands up must say a verb.' },
    { title: '8 is for mate or ‘friend’', description: 'If a student selects an 8, then they must pick another student to spell a noun.' },
    { title: '9 is for rhyme.', description: 'If a student selects a 9, then they must say a word out loud. Then, each student in the group must say a rhyming word in succession going clockwise.' },
    { title: '10 is for ‘Never Have I Ever.’', description: 'Everyone holds up 3 fingers. The student that selected the card says, “Never have I ever…” and completes the sentence. If other students have done that particular thing, then they must lower a finger. This continues until someone has no fingers left. The student without any fingers remaining must do something funny or challenging.' },
    { title: 'Jack is for rule.', description: 'The student who selects the card makes a rule that must be followed for the whole game. If someone breaks the rule, then they have to spell a noun.' },
    { title: 'Queen is for question. ', description: 'The student who selects the card asks another student a question.' },
    { title: 'King is for King’s Cup.', description: 'The student who selects the first King must assign a funny or challenging task. Then, the students who select the next 3 Kings must perform the task.' },
  ];

  title = '';
  description = ''; 
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(): void {
    if (this.card) {
      console.log('currentCard: ', this.card);
      console.log('currentCard Number is : ', +this.card.split('_')[1]);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
