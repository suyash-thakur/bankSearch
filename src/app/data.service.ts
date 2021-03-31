import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private favData: Array<any> = [];
  public getFavData() {
    let data = localStorage.getItem('favorites');
    if (data != null) {
      this.favData = JSON.parse(data);
    }
    return this.favData;
  }
  public setFavData(fav) {
    this.favData.push(fav);
    localStorage.setItem('favorites', JSON.stringify(this.favData));
    return of(this.favData);

  }
  public removeFav(fav) {
    var index = -1;
    for (var i = 0; i < this.favData.length; i++) {
      if (this.favData[i].ifsc === fav) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      this.favData.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favData));
    }
    return of(this.favData);
  }

  public removeFavIndex(id) {
    this.favData.splice(id, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favData));
    return of(this.favData);

  }

  constructor() { }
}
