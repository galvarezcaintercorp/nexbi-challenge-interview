import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PokemonListResponse, PokemonResponse} from "../models/pokemon-api.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokedex(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=100000&offset=0`);
  }

  getPokemonDetails(id: number): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}/pokemon/${id}`);
  }

  searchPokemon(name: string): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.apiUrl}/pokemon/${name.toLowerCase()}`);
  }
}
