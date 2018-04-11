import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showDialog = false;
  showWin = false;
  audio = new Audio();
  ngOnInit() {
    this.playSong();
}

 playSong() {
    this.audio.src = "../assets/SFX/feeling_happy.mp3";
    this.audio.load();
    this.audio.play();
 }

}
