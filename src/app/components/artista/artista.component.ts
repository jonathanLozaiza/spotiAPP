import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista: any;
  loading: boolean;
  tracks: any[];

  constructor(
    private router: ActivatedRoute,
    private spotify: SpotifyService
    ) {
        this.router.params.subscribe( param => {
          this.getArtista(param['id']);
          this.getTracks(param['id']);
        });
    }

  ngOnInit(): void {
  }

  getArtista(id: string){
        this.loading = true;
        this.spotify.getArtista(id).subscribe((data: any) => {
          console.log(data);
          this.artista = data;
          this.loading = false;
        });
  }

  getTracks(id: string){
    this.spotify.getTopTracks(id).subscribe((data: any) => {
      this.tracks = data;
      console.log(data);
    })
  }

}
