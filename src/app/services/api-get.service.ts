import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiGetService {
  baseUrl = 'https://xivapi.com/character/search?'

  constructor(private http: HttpClient) { }
  async getServer() {
    return await this.http.get<any>('https://xivapi.com/servers').toPromise();
  }
  async findID(firstName, lastName, server) {
    return await this.http.get<any>(this.baseUrl + 'name=' + firstName + '+' + lastName + '&server=' + server).toPromise();
  }
  async findCharById(id) {
    return await this.http.get<any>('https://xivapi.com/character/' + id).toPromise();
  }
  async getCharFC(id) {
    return await this.http.get<any>('https://xivapi.com/character/' + id + "?data=FCM").toPromise();
  }
  async getfcMember(name, server) {
    return await this.http.get<any>(this.baseUrl + 'name=' + name + '&server=' + server).toPromise();
  }
  async getGear(id) {
    return await this.http.get<any>('https://xivapi.com/character/' + id + '?extended=1').toPromise();
  }
}
