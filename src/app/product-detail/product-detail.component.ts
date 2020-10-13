import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { Options,ChangeContext } from 'ng5-slider';
import { NgSelectConfig } from '@ng-select/ng-select';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  constructor(private apiService: ApiService,private actRoute: ActivatedRoute,private config: NgSelectConfig) { }
  productData;
  arrayIndex;
  username;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activebtn='rent';
  rentType='/mo on Rent';
  Price='monthRent';

quantityData=[1,2,3,4,5]
  quantitySelected = 1;

  value: number = 12;
  options: Options = {
    floor: 1,
    ceil: 12,
    showTicks: true,
    //showTicksValues: true,
    ticksValuesTooltip: (v: number): string => {
      return 'Tooltip for ' + v;
    }
  };

  get productDataname() { return (this.productData && this.productData.name) ? this.productData.name : null }
  ngOnInit(): void {

    if(Object.keys(history.state).length > 2) {
      this.productData = history.state;
    }
    else{


      this.apiService.getProducts().subscribe((data)=>{

        this.username = this.actRoute.snapshot.params.id;
          console.log(Array.isArray(data),1111111111);

      //  this.arrayIndex =  Object.keys(data).findIndex(x=> x.userName === this.username);
        this.arrayIndex =  Object.keys(data).findIndex(x=> data[x]['userName']===this.username);
        this.productData = data[this.arrayIndex];
        this.productData.monthRent_dup =   this.productData.monthRent;

      });
    }

    this.galleryOptions = [
      {
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-arrow-circle-o-right',
        closeIcon: 'fa fa-window-close'
      },
      {
          width: '600px',
          height: '440px',
          thumbnailsColumns: 5,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: true,
          imageArrows: true,
          thumbnailsArrows: true,
          thumbnailsMargin: 10,
          thumbnailMargin: 20,
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '450px',
          height: '320px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          preview: true
      },
      // max-width 400
      {
        width: '300px',
        height: '200px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
          breakpoint: 400,
          preview: true
      }
  ];

  this.galleryImages = [
      {
          small: 'assets/img/products/1.jpg',
          medium: 'assets/img/products/1.jpg',
          big: 'assets/img/products/1.jpg'
      },
      {
          small:  'assets/img/products/2.jpg',
          medium:  'assets/img/products/2.jpg',
          big:  'assets/img/products/2.jpg'
      },
      {
          small:  'assets/img/products/3.jpg',
          medium:  'assets/img/products/3.jpg',
          big:  'assets/img/products/3.jpg'
      }
  ];


  }

  public changed(e: any): void {
    this.quantitySelected = e;
  }

  onrentChange(changeContext: ChangeContext): void {
    console.log(changeContext.value)
    let multValue = {1:12,2:11,3:10,4:9,5:8,6:7,7:6,8:5,9:4,10:3,11:2,12:1}
    this.productData.monthRent = this.productData.monthRent_dup*multValue[changeContext.value];
  }


  handleActivebtn(event: Event) {

    let target = event.target as HTMLInputElement;
    if(target.nodeName === 'INPUT'){
      this.activebtn=target.value;
     if(target.value=='rent'){
      this.rentType='/mo on Rent';
      this.Price='monthRent';
     }
     else if(target.value=='used'){
      this.rentType=' Buy Used';
      this.Price='buySecond';
     }
     else if(target.value=='new'){
      this.rentType=' Buy New';
      this.Price='buyNew';
     }
    }

  }

}
