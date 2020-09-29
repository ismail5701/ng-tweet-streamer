import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AddResponse, AddRequest, TweetHistoryDto, Tweet } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class TweetStreamApiService {

  uri = 'http://localhost:8080';

  liveTweets: Tweet[] = [];

  constructor(private http: HttpClient) { }

  deleteRules(): Observable<any> {
    return this.http.delete<any>(this.uri + '/rules')
      .pipe(
        catchError(this.handleError<any>('delete rules', null))
      );
  }

  addRules(payload: AddRequest): Observable<AddResponse> {
    return this.http.post<[]>(this.uri + '/rules', payload)
      .pipe(
        catchError(this.handleError<any>('add rules', null))
      );
  }

  getHistory(page: number): Observable<TweetHistoryDto> {
    return this.http.get<[]>(this.uri + '/history')
      .pipe(
        catchError(this.handleError<any>('get history', null))
      );
  }

  stream(): Observable<any> {
    return this.http.get(this.uri + '/stream').pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private toTweet(json: string): Tweet {
      return JSON.parse(json);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
