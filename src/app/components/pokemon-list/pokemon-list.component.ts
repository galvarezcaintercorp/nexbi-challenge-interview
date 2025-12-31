import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: 'pokemon-list.component.html',
  styleUrl: 'pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  trainerName: any = 'Ash Ketchum';
  capturedPokemons: any = [];

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
    const stored = localStorage.getItem('capturedPokemons');
    if (stored) {
      this.capturedPokemons = JSON.parse(stored);
    } else {
      this.capturedPokemons = [];
    }
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

  deletePokemon(id: any) {
    // TODO: Implementar
  }
}
