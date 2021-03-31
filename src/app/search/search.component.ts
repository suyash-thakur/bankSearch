import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes, faMapMarkerAlt, faStar, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchIcon = faSearch;
  crossIcon = faTimes;
  markerIcon = faMapMarkerAlt;
  nextIcon = faChevronRight;
  prevIcon = faChevronLeft
  starIcon = faStar;
  city = ['MUMBAI', 'DELHI', 'BANGALORE', 'KOLKATA'];
  selectedCity: any = 'MUMBAI';
  searchQuery = '';
  pageSize = 10;
  pageNo = 0;
  totalPage = 0;
  bankList: any;
  isLoaded = false;
  favList = [];
  searchResult: Array<any> = [];
  totalResultList: Array<any> = [];
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + this.selectedCity).subscribe(res => {
      this.bankList = res;
      this.isLoaded = true;
    });
    this.favList = this.dataService.getFavData();

  }
  addFavorite(id) {
    this.dataService.setFavData(this.bankList[this.searchResult[id]]).subscribe(res => {
      this.favList = res;
    });
  }
  checkIfFav(id): boolean {
    for (var i = 0; i < this.favList.length; i++) {
      if (this.bankList[this.searchResult[id]].ifsc === this.favList[i].ifsc) {
        return true;
      }
    }
    return false;

  }
  removeFav(id) {
    this.dataService.removeFav(this.bankList[this.searchResult[id]].ifsc).subscribe(res => {
      this.favList = res;
    });
  }
  search() {
    this.searchResult = [];
    this.totalResultList = [];
    this.totalPage = 0;
    this.searchQuery = this.searchQuery;
    let minBound = this.pageNo * this.pageSize;
    let maxBound = minBound + this.pageSize;
    for (var j = 0; j < this.bankList.length; j++) {
      if (this.bankList[j].address.includes(this.searchQuery.toUpperCase()) || this.bankList[j].bank_name.includes(this.searchQuery.toUpperCase()) || this.bankList[j].branch.includes(this.searchQuery.toUpperCase()) || this.bankList[j].city.includes(this.searchQuery.toUpperCase()) || this.bankList[j].district.includes(this.searchQuery.toUpperCase()) || this.bankList[j].ifsc.includes(this.searchQuery.toUpperCase()) || this.bankList[j].state.includes(this.searchQuery.toUpperCase())) {
        this.totalResultList.push(j);
      }
    }
    for (var i = minBound; i < Math.min(this.totalResultList.length, maxBound); i++) {

        this.searchResult.push(this.totalResultList[i]);
    }

    console.log(this.totalResultList.length / this.pageSize);
    this.totalPage = Math.ceil(this.totalResultList.length / this.pageSize);
  }
  nextPage() {
    if (this.totalPage > this.pageNo + 1) {
      this.pageNo = this.pageNo + 1;
      this.search();
    }
  }
  prevPage() {
    if (this.pageNo !== 0) {
      this.pageNo = this.pageNo - 1;
      this.search();
    }
  }

  clearSearch() {
    this.searchQuery = "";
    this.searchResult = [];
  }
  onCityChange() {
    this.isLoaded = false;
    this.http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + this.selectedCity).subscribe(res => {
      this.bankList = res;
      this.isLoaded = true;

      this.search();

    });
  }
}
