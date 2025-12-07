import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientModel } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class SharedclientService {
  private clientSource = new BehaviorSubject<ClientModel | null>(null);
  client$ = this.clientSource.asObservable();

  setClient(client: ClientModel) {
    this.clientSource.next(client);
  }

  getClient(): ClientModel | null {
    return this.clientSource.value;
  }
}
