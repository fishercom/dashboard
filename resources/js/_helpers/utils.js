export const env=(alias)=>{
    const config = import.meta.env;

    switch(alias){
        case 'API_URL':
            config['API_URL'] = ''; //config['BASE_URL']+'api';
            break;
    }

    return config[alias];
}

export const langId = ()=>{
    //if(!localStorage.getItem('langId')) localStorage.setItem('langId', '1');
    return localStorage.getItem('langId')?? '1';
}

export const lockWeel = (e)=>{ return e.target.blur() }

export const getDays = ()=>{
    let start=1;
    let end=31
    return Array(end-start+1).fill().map(() => start++)
}

export const getMonths =()=>{
    return [
        {name: 'Enero', value: '1', abrv: 'Ene'},
        {name: 'Febrero', value: '2', abrv: 'Feb'},
        {name: 'Marzo', value: '3', abrv: 'Mar'},
        {name: 'Abril', value: '4', abrv: 'Abr'},
        {name: 'Mayo', value: '5', abrv: 'May'},
        {name: 'Junio', value: '6', abrv: 'Jun'},
        {name: 'Julio', value: '7', abrv: 'Jul'},
        {name: 'Agosto', value: '8', abrv: 'Ago'},
        {name: 'Septiembre', value: '9', abrv: 'Sep'},
        {name: 'Octubre', value: '10', abrv: 'Oct'},
        {name: 'Noviembre', value: '11', abrv: 'Nov'},
        {name: 'Diciembre', value: '12', abrv: 'Dic'},
    ]
}

export const getYears = ()=>{
    let start=2015;
    let end=(new Date()).getFullYear()+7
    return Array(end-start+1).fill().map(() => start++)
}

export const checkDateField = (target, field)=>{
    const date = new Date(target[field+'.year']+'/'+target[field+'.month']+'/'+target[field+'.day'])
    //console.log(date, isValid(date) && target[field+'.month']==(date.getMonth()+1)) && target[field+'.day']==(date.getDate())
    return target[field+'.month']==(date.getMonth()+1) && target[field+'.day']==(date.getDate())
}

export const getExtract = (content, maxchars=500) => {
    const strip = content.replace(/<[^>]+>/g, '').replace('&nbsp;', ' ');
    return strip.length > maxchars ? strip.substring(0, (maxchars+5)) + '...' : strip;
}

export const urlSlug = (page) =>{
    return '/' + page.slug
}

export const getField = (page, field) =>{
    return page.metadata[field]
}
