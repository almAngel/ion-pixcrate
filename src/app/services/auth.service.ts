import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { } from 'selenium-webdriver/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private urls: any = {
        ROOT: "https://p11410199117114115105118101.herokuapp.com/",
        GET_ACCESS: "home/access",
        REGISTER: "home/new",
        END_SESSION: "home/end"
    };

    constructor(
        private httpClient: HttpClient
    ) { }

    getAccess(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(this.urls.ROOT + this.urls.GET_ACCESS, {
                email: email,
                password: password
            }, {
                responseType: "json",
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*"
                })
            })
            .subscribe((data) => {
                resolve(data);
            });
        });
    }

    logOut(token: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.delete(this.urls.ROOT + this.urls.END_SESSION, {
                responseType: "json",
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*",
                    "px-token": token
                })
            })
            .subscribe((data) => {
                resolve(data);
            });
        });
    }

    registerUser(user: object) {
        return new Promise((resolve, reject) => {
            this.httpClient.post(this.urls.ROOT + this.urls.REGISTER, user, {
                responseType: "json",
                headers: new HttpHeaders({
                    "Access-Control-Allow-Origin": "*"
                })
            })
            .subscribe((data) => {
                resolve(data);
            });
        });
    }
}
