import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  
  constructor(private httpClient: HttpClient) {
    
  }
}
