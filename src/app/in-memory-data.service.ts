import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';
import { Song } from './song';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    
    const songs = [
      { id: 1, song_no: 12392, title: 'All The Love', artist: 'Outfield', karaoke_system: 'megapro' },
      { id: 2, song_no: 12400, title: 'Breakthru', artist: 'Queen', karaoke_system: 'megapro' },
      { id: 3, song_no: 12401, title: 'Careful', artist: 'Paramore', karaoke_system: 'megapro' },
      { id: 4, song_no: 12402, title: 'Cha Cha Dabarkads', artist: 'Ryzza ft. Jose and Wally', karaoke_system: 'megapro' },
      { id: 5, song_no: 12406, title: 'Do You Belive In Me', artist: 'Eric Gadd', karaoke_system: 'megapro' },
      { id: 6, song_no: 12407, title: "Don't Bother", artist: 'Shakira', karaoke_system: 'megapro' },
      { id: 7, song_no: 12408, title: "Don't Tell My Heart To Stop Loving You", artist: 'Bobby Gonzales', karaoke_system: 'megapro' },
      { id: 8, song_no: 12411, title: 'Easy', artist: 'Sugababes', karaoke_system: 'megapro' },
      { id: 9, song_no: 12414, title: 'Everytime We Touch', artist: 'Cascade', karaoke_system: 'megapro' },
      { id: 10, song_no: 12415, title: 'Farewell To You', artist: 'White Lion', karaoke_system: 'megapro' }
    ];
    
    return {songs};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }

  genId(songs: Song[]): number {
    return songs.length > 0 ? Math.max(...songs.map(song => song.id)) + 1 : 11;
  }
}
