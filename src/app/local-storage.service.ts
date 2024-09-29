import { Injectable } from '@angular/core';
import { MatchStats } from './models/matchStats';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Guardar un dato en LocalStorage
  setItem(key: string, value: any): void {
    let matches: { [key: string]: MatchStats } = this.getItems("matches");
    if (matches != undefined) {
      matches[key] = value
    } else {
      matches = {}
      matches[key] = value
    }
    const stringValue = JSON.stringify(matches);
    localStorage.setItem("matches", stringValue);
  }

  // Obtener un dato de LocalStorage
  getItem(key: string): any {
    const matches = this.getItems("matches");
    if (matches != undefined) {
      return JSON.parse(matches[key]);
    } else {
      return null
    }
  }

  getItems(key: string): any {
    const value = localStorage.getItem(key);
    debugger;
    return value ? JSON.parse(value) : null;
  }

  // // Eliminar un dato de LocalStorage
  // removeItem(key: string): void {
  //   localStorage.removeItem(key);
  // }

  // // Limpiar todo LocalStorage
  // clear(): void {
  //   localStorage.clear();
  // }
}
