import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private readonly store = inject(Store);

  // TODO: implement actions, selectors
}
