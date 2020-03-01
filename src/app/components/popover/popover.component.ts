import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PublicationComponent } from '../publication/publication.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  header: string;
  options: [{ name: string, callback: Function }];
  dismiss: Function;

  constructor() {
  }

  ngOnInit() {}
}
