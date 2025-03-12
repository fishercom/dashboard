import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { accountActions, clienteActions } from '../../../_actions'

export const Gracias = (props)=>{
    const account = useSelector(state => state.authentication.account)
    const response = props.response
    const cliente = props.cliente
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleLogout = (e)=>{
        if(account){
            dispatch(accountActions.logout())
        }
        const { from } = location.state || { from: { pathname: '/' } };
        dispatch(clienteActions.resetForm(from))
        window.scrollTo(0, 0)
    }

    return (
    <div className="layer_standard layer_listo" style={{display: 'block'}}>
		<div className="sombra_layer"></div>
		<div className="caja">
			<div className="btn_close">
                <a href="#" onClick={handleLogout} className="full"></a>
            </div>
			<div className="titulo titulo_small">
                Mesa de Partes virtual
			</div>
            <div className="ico_listo">
                <img src="images/ico-listo.png"/>
            </div>
			<div className="parrafo">
                <strong>Tu solicitud ha sido enviada con éxito.</strong> <br/>
                Hemos enviado la confirmación de envío al correo electrónico registrado en el sistema.
			</div>

			<div className="btn_azul btn_finalizar">
				<a href="#" onClick={handleLogout} className="full"></a>
				Finalizar
			</div>
			<div className="clear"></div>
		</div>
	</div>
    )
}
