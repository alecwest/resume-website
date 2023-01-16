import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService, UserData } from './api/v1';


/**
 * Until I can generate an openapi or swagger doc that includes tags,
 * this wrapper will provide a better name for the service generated by openapi-generator-cli
 */
@Injectable({
  providedIn: 'root'
})
export class ResumeDataService {

  constructor(private service: DefaultService) { }

  public getEntriesByUser(username: string): Observable<UserData> {
    return this.service.getEntriesByUser(username);
  }
}
