import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit, OnDestroy {
  showChat = true;
  searchToChatSwitcherSub: Subscription;

  constructor(private utilityService: UtilityService) { }
  
  ngOnInit(): void {
    this.searchToChatSwitcherSub = this.utilityService.searchToChatSwitcher.subscribe(value => {
      if(value === "search") {
        this.showChat = false;
      } else {
        this.showChat = true;
      }
    })
  }
  ngOnDestroy(): void {
    this.searchToChatSwitcherSub.unsubscribe();
  }

}
