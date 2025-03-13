import { createBrowserHistory } from 'history';
import { config } from './config'

export const public_folder = config.BASE_URL
export const history = createBrowserHistory({basename: `${config.BASE_URL}`});
export const assets =(path)=>{
    return public_folder+path
}

console.log(config);
