import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: 'add-pokemon.component.html',
  styleUrl: 'add-pokemon.component.scss'
})
export class AddPokemonComponent implements OnInit {
  searchTerm: any = '';
  pokemonFound: any = null;
  loading = false;
  error: any = null;
  showCaptureForm = false;
  captureForm: FormGroup;
  pokemonList: any[] = [];
  suggestions: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.captureForm = this.fb.group({
      captureLocation: [''],
      pokeballType: ['Pokéball'],
      level: [1],
      nickname: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=500')
      .subscribe({
        next: (data: any) => {
          this.pokemonList = data.results.map((p: any, index: number) => ({
            id: index + 1,
            name: p.name
          }));
        },
        error: () => {
        }
      });
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.suggestions = [];
      this.pokemonFound = null;
      this.error = null;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.suggestions = this.pokemonList
      .filter(p => p.name.startsWith(searchLower) || p.id.toString() === searchLower)
      .slice(0, 8);
  }

  selectPokemon(pokemon: any) {
    this.searchTerm = pokemon.name;
    this.suggestions = [];
    this.searchPokemon();
  }

  searchPokemon() {
    if (!this.searchTerm) {
      this.error = 'Por favor ingresa un nombre o número de Pokémon';
      return;
    }

    this.loading = true;
    this.error = null;
    this.pokemonFound = null;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`)
      .subscribe({
        next: (data: any) => {
          this.pokemonFound = {
            id: data.id,
            pokemonId: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            image: data.sprites.other['official-artwork'].front_default,
            hp: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
            attack: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
            defense: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0
          };
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = 'No se encontró el Pokémon. Intenta con otro nombre o número.';
        }
      });
  }

  capturePokemon() {
    const capturedPokemon = {
      id: Date.now(),
      ...this.pokemonFound,
      captureDate: new Date(),
      captureLocation: this.captureForm.value.captureLocation,
      pokeballType: this.captureForm.value.pokeballType,
      level: this.captureForm.value.level,
      nickname: this.captureForm.value.nickname,
      description: this.captureForm.value.description
    };

    const stored = localStorage.getItem('capturedPokemons');
    const pokemons = stored ? JSON.parse(stored) : [];
    pokemons.push(capturedPokemon);
    localStorage.setItem('capturedPokemons', JSON.stringify(pokemons));

    this.router.navigate(['/']);
  }

  cancelCapture() {
    this.showCaptureForm = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
