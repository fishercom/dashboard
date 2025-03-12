import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';
import { assets } from "../../_helpers";
import { ErrorFormAlert } from '../../_components';

export const PasswordLayer =(props)=>{
    const showPassword = props.showPassword;
    const [values, setValues] = useState({email:''})
    const sending = useSelector(state => state.account.sending);
    const response = useSelector(state => state.account.response);
    const error = useSelector(state => state.account.error);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {

      //dispatch(accountActions.logout())
    }, [])

    const handleChange = (e)=> {
        const { name, value } = e.target
        setValues(values => ({ ...values, [name]: value }))
    }

    const handleShowPassword = (e)=>{
        props.handleShowPassword();
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSubmitted(true)
        if (values.email) {
            const { from } = { from: { pathname: "/" } }
            dispatch(accountActions.forgot(values, from))
            setSubmitted(false)
        }
    }

  return (
    <div className="layer_standard layer_password" style={{display: !showPassword? "none": "block"}}>
        <div className="sombra_layer"></div>
        <div className="caja">
            <Spinner visible={sending} text='Enviando...'></Spinner>
            <div className="btn_close" onClick={handleShowPassword}></div>
            {!response &&
            <>
            <div className="titulo">
                Recuperar contraseña
            </div>
            <div className="parrafo">
                Ingresa tu correo electrónico para restablecer tu contraseña <br/>
            </div>
            <div className="campo">
                <div className="txt">
                    Correo electrónico
                </div>
                <input type="text" name="email" placeholder="Escribir"
                onChange={handleChange} value={values.email}
                className={'form-control' + (submitted && !values.email ? ' is-invalid' : '')}/>
                {submitted && !values.email &&
                    <div className="invalid-feedback" style={{top: 'unset'}}>Dato Obligatorio</div>
                }
            </div>
            <br/>
            {!sending && error &&
                <ErrorFormAlert msg={error}/>
            }
            <br/>
            <br/>
            <div className="btn_azul btn_restablecer">
                <a href="#" onClick={handleSubmit} className="full"></a>
                Restablecer
            </div>
            </>
            }
            {response &&
            <>
            <div className="titulo">
                Operación exitosa!
            </div>
            <div className="parrafo">
                <br/>
                Se ha enviado un enlace a su correo electrónico.
            </div>
            </>
            }
            <div className="clear"></div>
        </div>
    </div>
  )
}
