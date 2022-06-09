import IJwtToken from "../Models/IJwtToken";
import { getTokenFromLocalStorage } from "../Utils/utils";

function get<T>(url: string): Promise<T> {
    return new Promise<T>(
        (resolve, reject) => {
            let headers = new Headers({
                "Content-Type": "application/json"
            });

            let token: IJwtToken | null = getTokenFromLocalStorage();
            if (token != null) {
                headers.append("Authorization", "Bearer " + token.token,);
            }
            fetch(url, {
                method: "GET",
                headers,
            }).then(
                (response) => response.ok ? response.json() : reject(new Error("Something awful happened:" + response.status)))
                .then((response: T) => {
                    resolve(response);
                });
            // .catch ((reason) => {
            //     reject(reason);
            // });
        });


}
function post<TReques, TResponse>(url: string, body: TReques): Promise<TResponse> {
    return new Promise<TResponse>(
        (resolve, reject) => {
            let headers = new Headers({
                "Content-Type": "application/json"
            });
            let token: IJwtToken | null = getTokenFromLocalStorage();
            if (token != null) {
                headers.append("Authorization", "Bearer " + token.token,);
            }
            fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }).then(
                (response) => response.ok ? response.json() : reject(new Error("Something awful happened:" + response.status)))
                .then((response: TResponse) => {
                    resolve(response);
                }).catch((reason) => {
                    reject(reason);
                });

        });
}
//TODO res - > edit
// function put(url:string):Promise<T> {
//     return new Promise<T>(
//         (resolve, reject) => {
//             let headers = new Headers({
//                 "Content-Type": "application/json"
//             });
//             let token: IJwtToken | null = getTokenFromLocalStorage();
//             if (token != null) {
//                 headers.append("Authorization", "Bearer " + token.token,);
//             }
//             fetch(url, {
//                 method: "PUT",
//                 headers,
//                 //body: JSON.stringify(body),
//             }).then(
//                 (response) => response.ok ? resolve() : reject(new Error("Something awful happened:" + response.status)))
//                 .then((response: any) => {
//                     resolve();
//                 }).catch((reason) => {
//                     reject(reason);
//                 });

//         });
// }

function _delete(url: string): Promise<void> {
    return new Promise<void>(
        (resolve, reject) => {
            let headers = new Headers({
                "Content-Type": "application/json"
            });
            let token: IJwtToken | null = getTokenFromLocalStorage();
            if (token != null) {
                headers.append("Authorization", "Bearer " + token.token,);
            }
            fetch(url, {
                method: "DELETE",
                headers,
                //body: JSON.stringify(body),
            }).then(
                (response) => response.ok ? resolve() : reject(new Error("Something awful happened:" + response.status)))
                .then((response: any) => {
                    resolve();
                }).catch((reason) => {
                    reject(reason);
                });

        });
}

export { _delete, get, post };
