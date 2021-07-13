import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "./company";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  url = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) {}

  async getCompanies() {
    return this.httpClient
      .get<Company[]>(this.url + "Company/GetAll")
      .toPromise();
  }

  async saveCompany(params: any) {
    return this.httpClient
      .post<Company>(this.url + "Company/create", params)
      .toPromise();
  }

  async editCompany(params: any) {
    return this.httpClient
      .post<Company>(this.url + "Company/create", params)
      .toPromise();
  }

  async deleteCompany(id: number) {
    return this.httpClient
      .delete(this.url + "Company/delete/" + id)
      .toPromise();
  }
}
