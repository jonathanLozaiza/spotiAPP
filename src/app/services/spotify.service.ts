import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private httpClient: HttpClient,
    ) { }

    getQuery(query: string){
      const url = `https://api.spotify.com/v1/${query}`;

      const headers = new HttpHeaders({
        'Authorization' : 'Bearer BQAiV8FzQI_oDAiO9q5LsU8qFozPT5MmjNdBktm535k8J0U2-6dvi1t-06Ce4CJ-aXhlayNW4C2Hw2TZAXg'
      });

      return this.httpClient.get(url, {headers});
    }

    getNewRelease() {
      return this.getQuery('browse/new-releases?limit=20').pipe(
        map( (data: any) => {
          console.log(data.albums.items)
          return data.albums.items;
        })
      );
    }

    getArtistas(termino: string) {
      return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
        map((data: any) => data.artists.items)
      );
    }

    getArtista(id: string) {
      return this.getQuery(`artists/${id}`); /*.pipe(
        map((data: any) => data.artists.items)
      );*/
    }

    getTopTracks(id: string) {
      return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
        map( (data: any) => {
          return data.tracks;
        })
      )
    }
}
