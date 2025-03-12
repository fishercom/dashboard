import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';
import { assets } from "../../_helpers";
import { ErrorFormAlert } from '../../_components';

export const LoginLayer =(props)=>{
    const showLogin = props.showLogin;
    const [values, setValues] = useState({username:'', password: ''})
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const account = useSelector(state => state.authentication.account);
    const error = useSelector(state => state.authentication.error);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if(account && showLogin){
            handleShowLogin();
        }
    }, [account])

    const handleChange = (e)=> {
        const { name, value } = e.target
        setValues(values => ({ ...values, [name]: value }))
    }

    const handleShowLogin = (e)=>{
        props.handleShowLogin();
    }

    const handleShowPassword = (e)=>{
        props.handleShowLogin();
        props.handleShowPassword();
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSubmitted(true)
        if (values.username && values.password) {
            const { from } = { from: { pathname: "/cliente" } }
            dispatch(accountActions.login(values, from))
            setSubmitted(false)
        }
    }

  return (
    <div className="layer_standard layer_inicio_sesion" style={{display: !showLogin? "none": "block"}}>
		<div className="sombra_layer"></div>
		<div className="caja">
            <Spinner visible={loggingIn} text='Cargando...'></Spinner>
			<div className="btn_close" onClick={handleShowLogin}></div>
			<div className="titulo">
				Inicio de sesión
			</div>
			<div className="parrafo">
				Inicia tu sesión ingresando el nombre de usuario y <br/>
				la contraseña que registraste en el sistema:
			</div>
			<div className="campo">
				<div className="txt">
					Nombre de usuario
				</div>
                <input type="text" name="username" placeholder="Escribir"
                onChange={handleChange} value={values.username}
                className={'form-control' + (submitted && !values.username ? ' is-invalid' : '')}/>
                {submitted && !values.username &&
                    <div className="invalid-feedback" style={{top: 'unset'}}>Dato Obligatorio</div>
                }
			</div>
			<div className="campo">
				<div className="txt">
					Contraseña
				</div>
                <input type="password" name="password" placeholder="Escribir"
                onChange={handleChange} value={values.password}
                className={'form-control' + (submitted && !values.password ? ' is-invalid' : '')}/>
                {submitted && !values.password &&
                    <div className="invalid-feedback" style={{top: 'unset'}}>Dato Obligatorio</div>
                }
			</div>

            {!loggingIn && error &&
                <ErrorFormAlert msg={error}/>
            }

            <a href="#" className="olvidaste" onClick={handleShowPassword} >¿Olvidaste tu contraseña?</a>

			<div className="btn_azul btn_inicio_sesion">
				<a href="#" onClick={handleSubmit} className="full"></a>
				Iniciar sesión
			</div>
			<div className="clear"></div>
		</div>
	</div>
  )
}
