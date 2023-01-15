import { Injectable } from '@angular/core';
import { DefaultService } from './api/v1';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private service: DefaultService) { }

  doAThing() {
    return this.service.resumeUserGet("alecwest");
  }
}
