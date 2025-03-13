import { accountService } from '../_services'

export const authHeader=()=>{
    // return authorization header with jwt token
    let account = JSON.parse(accountService.getAccount());

    if (account && account.token) {
        return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + account.token };
    } else {
        return { 'Content-Type': 'application/json' };
    }
}
