import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { accountActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';
import { assets } from "../../_helpers";
import { ErrorFormAlert } from '../../_components';

export const PwdResetLayer =(props)=>{
    const showPwdReset = props.showPwdReset;
    const [values, setValues] = useState({token: '', username: '', password: '', password_confirm: ''})
    const sending = useSelector(state => state.account.sending);
    const response = useSelector(state => state.account.response);
    const error = useSelector(state => state.account.error);
    const [submitted, setSubmitted] = useState(false);
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    useEffect(() => {

        setValues({ token: searchParams.get('token'), username: searchParams.get('username'), password: '', password_confirm: '' })
    }, [])

    const handleChange = (e)=> {
        const { name, value } = e.target
        setValues(values => ({ ...values, [name]: value }))
    }

    const handleShowPwdReset = (e)=>{
        props.handleShowPwdReset();
    }

    const validateFields = ()=>{
        //return true
        return values.token &&
            values.username &&
            values.password &&
            values.password_confirm &&
            (values.password == values.password_confirm)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setSubmitted(true)
        if (validateFields()) {
            const { from } = { from: { pathname: "/" } }
            dispatch(accountActions.resetPassword(values, from))
            setSubmitted(false)
        }
    }

  return (
    <div className="layer_standard layer_password" style={{display: !showPwdReset? "none": "block"}}>
        <div className="sombra_layer"></div>
        <div className="caja">
            <Spinner visible={sending} text='Enviando...'></Spinner>
            <div className="btn_close" onClick={handleShowPwdReset}></div>
            {!response &&
            <>
            <div className="titulo">
                Actualizar contraseña
            </div>
            <div className="parrafo">
                Ingresa los datos para actualizar tu contraseña <br/>
            </div>
            <div className="campo">
                <div className="txt">
                    Nombre de Usuario
                </div>
                <input type="text" name="username" placeholder="Escribir"
                onChange={handleChange} readOnly={true} value={values.username}
                className={'form-control' + (submitted && !values.username ? ' is-invalid' : '')}/>
                {submitted && !values.username &&
                    <div className="invalid-feedback" style={{top: 'unset'}}>Dato Obligatorio</div>
                }
            </div>
			<div className="campo">
				<div className="txt">
                    Nueva Contraseña
				</div>
                <input type="password" name="password" placeholder="Escribir"
                onChange={handleChange} value={values.password}
                className={'form-control' + (submitted && !values.password ? ' is-invalid' : '')}/>
                {submitted && !values.password &&
                    <div className="invalid-feedback" style={{top: 'unset'}}>Dato Obligatorio</div>
                }
			</div>
			<div className="campo">
				<div className="txt">
					Confirmar Contraseña
				</div>
                <input type="password" name="password_confirm" placeholder="Escribir"
                onChange={handleChange} value={values.password_confirm}
                className={'form-control' + (submitted && !values.password_confirm ? ' is-invalid' : '')}/>
                {submitted && !values.password_confirm &&
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
                Actualizar
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
                Su contraseña ha sido actualizada con éxito.
            </div>
            </>
            }
            <div className="clear"></div>
        </div>
    </div>
  )
}
