import { HttpHeaders } from "@angular/common/http";

export const url = 'http://localhost:6900'
export const token = localStorage.getItem('token');
export const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
