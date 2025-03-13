import { createBrowserHistory } from 'history';
import { env } from './utils'

export const public_folder = env('BASE_URL')
export const history = createBrowserHistory({basename: `${env('BASE_URL')}`});
export const assets =(path)=>{
    return public_folder+path
}

console.log(import.meta.env);
