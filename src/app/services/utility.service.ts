import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  searchToChatSwitcher = new Subject<string>();
  constructor() { }
}
