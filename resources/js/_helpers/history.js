import { createBrowserHistory } from 'history';
import { config } from './config'

export const public_folder = config().appUrl
export const history = createBrowserHistory({basename: `${config().appUrl}`});
export const assets =(path)=>{
    return public_folder+path
}

console.log(config());
