import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cmsActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';
import { assets, history, htmlContent, getField, urlSlug, menuTop } from "../../_helpers";
import { Disclaimer } from '../shared/Disclaimer';
import { LoginLayer } from '../shared/LoginLayer';
import { PasswordLayer } from '../shared/PasswordLayer';
import { PwdResetLayer } from '../shared/PwdResetLayer';
import { VideoLayer } from '../shared/VideoLayer';

export const Home = ()=>{
    const account = useSelector(state => state.authentication.account)
    const cms = useSelector(state => state.cms)
    const [showLogin, setshowLogin] = useState(false)
    const [showPassword, setshowPassword] = useState(false)
    const [showPwdReset, setShowPwdReset] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        document.getElementById('app').className= 'wrapper wrapper_home';
        //dispatch(cmsActions.getHome())

        if(searchParams.has('token') && searchParams.has('username')){
            setShowPwdReset(true);
        }
    }, [])

    const handleShowLogin = ()=>{
        setshowLogin(!showLogin)
    }

    const handleShowPassword = ()=>{
        setshowPassword(!showPassword)
    }

    const handleShowPwdReset = ()=>{
        setShowPwdReset(!showPwdReset)
    }

    const handleShowVideo = ()=>{
        setShowVideo(!showVideo)
    }

    return(
        <>
        <section className="seccion_principal">
			<div className="container">
				<h2>
					Te damos la más cordial bienvenida a la mesa  <br/>
					de partes virtual del Metro de Lima Línea 2
				</h2>
				<div className="texto">
					A través de este canal, tienes la posibilidad de presentar documentos  <br/>
					de manera online, las 24 horas del día, los siete días de la semana.
				</div>
				<div className="row">
					<div className="col-md-7">
						<div className="caja_trans">
							Es importante que tengas en cuenta lo siguiente:
							<ul>
								<li>
									Los documentos ingresados luego de las 5:00 p.m. serán registrados con la fecha del siguiente día hábil.
								</li>
								<li>
									Los documentos ingresados los sábados, domingos, feriados o cualquier otro día inhábil, se considerarán registrados con la fecha del siguiente día hábil.
								</li>
							</ul>
						</div>
						<div className="texto">
							Estamos aquí para brindarte un servicio eficiente y accesible. <br/>
							¡Gracias por confiar en nosotros!
						</div>
					</div>
					<div className="col-md-5">
						<div className="botonera">
                            {account &&
                            <>
							<div className="btn_yellow" style={{ maxWidth: '300px' }}>
                                <Link className="full" to="/cliente"></Link>
								Registrar documento
							</div>
							<div className="btn_transparente" style={{ maxWidth: '300px' }}>
                                <Link className="full" to="/historial"></Link>
								Historial de documentos
							</div>
                            </>
                            }
                            {!account &&
                            <>
							<div className="btn_yellow">
                                <Link className="full" to="/cliente"></Link>
								Regístrate
							</div>
							<div className="btn_transparente" id="btnInicioSesion">
                                <a href='#' onClick={handleShowLogin} className="full"></a>
								Inicia sesión
							</div>
                            </>
                            }
						</div>
					</div>
				</div>
                <div className="acc-video btn_video" onClick={handleShowVideo}>
                    <img src={ assets("/images/boton-tutorial.svg") } alt="video"/>
                </div>
			</div>
        </section>
        <LoginLayer showLogin={showLogin} handleShowLogin={handleShowLogin} handleShowPassword={handleShowPassword}></LoginLayer>
        <PasswordLayer showPassword={showPassword} handleShowPassword={handleShowPassword}></PasswordLayer>
        <PwdResetLayer showPwdReset={showPwdReset} handleShowPwdReset={handleShowPwdReset}></PwdResetLayer>
        <VideoLayer showVideo={showVideo} handleShowVideo={handleShowVideo}/>
        </>
    )
}
