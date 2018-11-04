import { Component, OnInit } from '@angular/core';

import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs: Song[];
  
  constructor(private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs()
      .subscribe(songs => this.songs = songs);
  }

}
