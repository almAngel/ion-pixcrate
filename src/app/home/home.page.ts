import { Component, ViewChild, OnInit } from '@angular/core';
import { FeedPage } from '../feed/feed.page';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  token: string;

  constructor(
    private router: Router,
    private storage: Storage,
    private jwtService: JwtHelperService,
    private imageService: ImageService
  ) { }

  async ngOnInit() {
  
  }

}

