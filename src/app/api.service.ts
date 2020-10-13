import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   constructor(private httpClient: HttpClient) { }
   API_URL = 'http://www.json-generator.com/api/json/get/cgBazTSyZK';
   public getProducts(){
    return this.httpClient.get(this.API_URL);
  }
}
