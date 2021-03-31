import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  bankList: any;
  starIcon = faStar;

  favList = [];
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {

    this.favList = this.dataService.getFavData();
  }
  removeFav(id) {
    this.dataService.removeFavIndex(id).subscribe(res => {
      this.favList = res;
    })
  }

}
