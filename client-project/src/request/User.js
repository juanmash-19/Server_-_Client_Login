import { ENV } from "../utils/constants";

export class User {
    base_api = ENV.BASE_API;

    async signUp(data) {
    console.log(data);
    const url = `${this.base_api}/${ENV.API_ROUTES.REGISTER}`;
    // http://localhost:3002/api/v1/users/new-user
    console.log(url);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
    }
}