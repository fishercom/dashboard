import React, { useState } from 'react'
import { assets, history, getField, urlSlug } from "../../_helpers";
//import { HtmlContent } from '../../_components';

export const Disclaimer =(props)=>{
	const icon = props.type=='white'? 'ico-alerta-white.png': 'ico-alerta-naranja.png';
	return (
            <div className="container">
                <div className="ico">
                    <img src={assets("/images/"+icon)}/>
                </div>
                <div className="txt">
                    No utilizar este sitio para clienter sucesos que representen una amenaza inmediata a la vida. Las clientes presentadas mediante este servicio pueden no recibir una respuesta inmediata. Si usted necesita ayuda de emergencia, contacte a sus autoridades necesarias.
                </div>
            </div>
        );
}
