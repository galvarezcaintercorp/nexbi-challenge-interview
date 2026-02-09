import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {CapturedPokemon} from "../../models/captured-pokemon.model";
import {PersistenceService} from "../../services/persistence.service";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: 'pokemon-list.component.html',
  styleUrl: 'pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  trainerName = 'Ash Ketchum del focking pueblo Paleta';
  capturedPokemonList: CapturedPokemon[] = [];

  private readonly persistence = inject(PersistenceService)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTrainerData();
    this.loadCapturedPokemons();
  }

  loadTrainerData() {
  }

  loadCapturedPokemons() {
    // TODO: Load captured pokemon list
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  viewPokemonDetails(pokemon: any) {
    console.log('Ver detalles de', pokemon.name);
  }

  formatDate(date: any) {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  }
}
