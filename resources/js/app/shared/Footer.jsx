import React from 'react'
import { Link } from 'react-router-dom'

import { assets } from "../../_helpers";
import { Disclaimer } from '../shared/Disclaimer';

export const Footer =()=>{

  return (
<footer>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="logo">
                    <Link className="full" to="/"></Link>
                    <img src={assets("/images/logo.jpg")} alt="Mesa de Parte"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="detalle">
                    Av. Victor Andrés Belaúnde 332 Of. 402, Lima Perú<br/>
                    Teléfono: 500-3630 / Celular: 945 112 489 <br/>
                    E-mail: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mesadepartes@metrolima2.com">mesadepartes@metrolima2.com</a>
                </div>
            </div>
            <div className="col-md-8">
                <div className="txt">
                    @Copyright 2024 - Todos los Derechos Reservados / <a href={assets('/politicas-mll2.pdf')} target='_blank'>Política de Protección de Datos Personales</a>
                </div>
            </div>
            <div className="col-md-4">
                <div className="redes">
                    <a href="https://metrolima2.com/" target="_blank"><i className="fa-solid fa-globe"></i></a>
                    <a href="https://www.facebook.com/linea2metrolima" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/metrodelima.l2/?hl=es-la" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.youtube.com/channel/UCt82SmI2BJ9DZidRMIU9lkw" target="_blank"><i className="fa-brands fa-youtube"></i></a>
                    <a href="https://www.linkedin.com/company/linea-2-del-metro-de-lima-y-callao/mycompany/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}
