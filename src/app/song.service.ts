import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Song } from './song';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SongService {
  
  private songsUrl = 'http://api.songhits.local/songs';

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  /** GET songs from the server */
  getSongs (): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.songsUrl}?_format=hal_json`)
      .pipe(
        tap(heroes => this.log('fetched songs')),
        catchError(this.handleError('getSongs', []))
      );
  }

  /** GET song by id. Return `undefined` when id not found */
  getSongNo404<Data>(id: number): Observable<Song> {
    const url = `${this.songsUrl}/?id=${id}`;
    return this.http.get<Song[]>(url)
        .pipe(
            map(songs => songs[0]), // returns a {0|1} element array
            tap(s => {
              const outcome = s ? `fetched` : `did not find`;
              this.log(`${outcome} song id=${id}`);
            }),
            catchError(this.handleError<Song>(`getSong id=${id}`))
        );
  }

  /** GET song by id. Will 404 if id not found */
  getSong(id: number): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;
    return this.http.get<Song>(url).pipe(
        tap(_ => this.log(`fetched song id=${id}`)),
        catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  /* GET songs whose name contains search term */
  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Song[]>(`${this.songsUrl}?_format=hal_json&title=${term}`).pipe(
      tap(_ => this.log(`found songs matching "${term}"`)),
      catchError(this.handleError<Song[]>('searchSongs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new song to the server */
  addSong (song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, httpOptions).pipe(
        tap((song: Song) => this.log(`added song w/ id=${song.id}`)),
        catchError(this.handleError<Song>('addSong'))
    );
  }

  /** DELETE: delete the song from the server */
  deleteSong (song: Song | number): Observable<Song> {
    const id = typeof song === 'number' ? song : song.id;
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted song id=${id}`)),
        catchError(this.handleError<Song>('deleteSong'))
    );
  }

  /** PUT: update the song on the server */
  updateSong (song: Song): Observable<any> {
    return this.http.put(this.songsUrl, song, httpOptions).pipe(
        tap(_ => this.log(`updated song id=${song.id}`)),
        catchError(this.handleError<any>('updateSong'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SongService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SongService: ${message}`);
  }
}
