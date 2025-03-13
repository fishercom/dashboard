import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parameterActions, ubigeoActions, clienteActions, accountActions } from '../../../_actions'
import { OptionNoAplica, ErrorFormAlert} from "../../../_components";
import { config, assets, history, getField, checkDateField } from "../../../_helpers";
import { parse, format, isValid } from 'date-fns';
import ReCAPTCHA from "react-google-recaptcha";

import { clienteViewmodel } from '../../../_viewmodels'

export const Form1 = (props)=>{
    const active = props.active
    const authentication = useSelector(state => state.authentication);
    const parameters = useSelector(state => state.parameters)
    const ubigeo = useSelector(state => state.ubigeo)
    const clientes = useSelector(state => state.clientes)
    const [values, setValues] = useState({...clienteViewmodel})
    const [submitted, setSubmitted] = useState(false)
    const recaptcha = useRef();
    const dispatch = useDispatch()

    const style_form = {'display': !active?'none': 'block'}

    useEffect(() => {
        dispatch(clienteActions.getNew({...clienteViewmodel}))
        dispatch(ubigeoActions.getDepartments())
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(clientes.persona){
            const nattr = !clientes.persona.message
            console.log(clientes.persona)

            if(values['tipo_documento']=='DNI'){
                setValues(values => ({ ...values, ['nombre']: (nattr? clientes.persona.nombres: '') }))
                setValues(values => ({ ...values, ['apellido_paterno']: (nattr? clientes.persona.apellidoPaterno: '') }))
                setValues(values => ({ ...values, ['apellido_materno']: (nattr? clientes.persona.apellidoMaterno: '') }))
            }
            if(values['tipo_documento']=='RUC'){
                setValues(values => ({ ...values, ['nombre']: (nattr? clientes.persona.razonSocial: '') }))
            }
        }
        if(clientes.response){
            console.log(clientes.response)
            dispatch(accountActions.autologin(clientes.response))
        }
    }, [clientes])

    useEffect(()=>{
        if(authentication.account){
            props.handleStep(2)
        }
    }, [authentication])

    const handleChange = (e)=> {
        let { name, value } = e.target
        switch(name){
            case 'anonimo':
                name = 'anonimo'
                value = e.target.checked? '1': ''
                break
            case 'nro_documento':
                if((values.tipo_documento =='DNI' && value.length==8) || (values.tipo_documento =='RUC' && value.length==11)){
                    const tipoDocumento = values['tipo_documento'];
                    const nroDocumento = e.target.value;
                    dispatch(clienteActions.getPersona(tipoDocumento, nroDocumento))
                }
                break
            case 'tipo_persona':
                setValues(values => ({ ...values, ['tipo_documento']: '' }))
                break
            case 'departamento_id':
                dispatch(ubigeoActions.getProvinces(value))
                break
            case 'provincia_id':
                dispatch(ubigeoActions.getDistricts(value))
                break
            case 'acepto_terminos':
                value = e.target.checked? '1': ''
                break
            }
        //console.log(name, value)
        setValues(values => ({ ...values, [name]: value }))
    }

    const validateFields = ()=>{
        //return true
        return values.tipo_persona
            && values.tipo_documento
            && values.nro_documento
            && values.nombre
            && (values.tipo_persona=='JURIDICA' || values.apellido_paterno)
            && (values.tipo_persona=='JURIDICA' || values.apellido_materno)
            && values.direccion

            && values.departamento_id
            && values.provincia_id
            && values.distrito_id

            && values.celular
            && values.email

            && values.username
            && values.password
            && values.password_confirm
            && values.password == values.password_confirm
            && values.password.length>=6

            && values.recaptcha
            && values.acepto_terminos
    }

    const handleNextStep = (e)=>{
        values.recaptcha=recaptcha.current.getValue()
        console.log(values);
        setSubmitted(true);
        if (validateFields()) {
          setSubmitted(false);
          dispatch(clienteActions.register(values))
        }
    }

    return (
    <section className="seccion_principal" style={style_form}>
        <div className="container">
            <h2>
                Registro
            </h2>
            <div className="subtitulo">
                Datos del solicitante
            </div>

            <div className="formulario">
                <div className="row">
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Tipo de persona*
                            </div>
                            <select name="tipo_persona" value={values.tipo_persona} onChange={handleChange}
                            className={'form-select' + (submitted && !values.tipo_persona ? ' is-invalid' : '')}>
                                <option value="">Selecione</option>
                                <option value="NATURAL">Persona Natural</option>
                                <option value="JURIDICA">Persona Jurídica</option>
                            </select>
                            {submitted && !values.tipo_persona &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Tipo de documento*
                            </div>
                            <select name="tipo_documento" value={values.tipo_documento} onChange={handleChange}
                            className={'form-select' + (submitted && !values.tipo_documento ? ' is-invalid' : '')}>
                                <option value="">Selecione</option>
                            {values.tipo_persona=='NATURAL' &&
                            <>
                                <option value="DNI">DNI</option>
                                <option value="CE">Carné de extranjería</option>
                            </>
                            }
                            {values.tipo_persona=='JURIDICA' &&
                            <>
                                <option value="RUC">RUC</option>
                            </>
                            }
                            </select>
                            {submitted && !values.tipo_documento &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Código de documento*
                            </div>
                            <input type="text" name='nro_documento' maxLength={15} value={values.nro_documento} onChange={handleChange}
                            className={'form-control' + (submitted && !values.nro_documento ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.nro_documento &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className={values.tipo_persona=='JURIDICA'? 'col-md-12': 'col-md-6'}>
                        <div className="campo">
                            <div className="txt">
                            {values.tipo_persona=='JURIDICA'? 'Razón Social': 'Nombres'}*
                            </div>
                            <input type="text" name='nombre' maxLength={100} value={values.nombre} onChange={handleChange}
                            className={'form-control' + (submitted && !values.nombre ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.nombre &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    {values.tipo_persona!='JURIDICA' &&
                    <>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Apellido paterno*
                            </div>
                            <input type="text" name='apellido_paterno' maxLength={100} value={values.apellido_paterno} onChange={handleChange}
                            className={'form-control' + (submitted && !values.apellido_paterno ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.apellido_paterno &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Apellido materno*
                            </div>
                            <input type="text" name='apellido_materno' maxLength={100} value={values.apellido_materno} onChange={handleChange}
                            className={'form-control' + (submitted && !values.apellido_materno ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.apellido_materno &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    </>
                    }
                </div>
            </div>

            <div className="subtitulo">
                Datos de contacto
            </div>

            <div className="formulario">
                <div className="row">
                    <div className="col-12">
                        <div className="campo">
                            <div className="txt">
                                Dirección*
                            </div>
                            <input type="text" name='direccion' maxLength={160} value={values.direccion} onChange={handleChange}
                            className={'form-control' + (submitted && !values.direccion ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.direccion &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Departamento*
                            </div>
                            <select name="departamento_id" value={values.departamento_id} onChange={handleChange}
                            className={'form-select' + (submitted && !values.departamento_id ? ' is-invalid' : '')}>
                                <option value="">Seleccionar</option>
                                {ubigeo.departments && ubigeo.departments.map(e=>
                                <option key={e.id} value={e.id}>{e.name}</option>
                                )}
                            </select>
                            {submitted && !values.departamento_id &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Provincia*
                            </div>
                            <select name="provincia_id" value={values.provincia_id} onChange={handleChange}
                            className={'form-select' + (submitted && !values.provincia_id ? ' is-invalid' : '')}>
                                <option value="">Seleccionar</option>
                                {ubigeo.provinces && ubigeo.provinces.map(e=>
                                <option key={e.id} value={e.id}>{e.name}</option>
                                )}
                            </select>
                            {submitted && !values.provincia_id &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Distrito*
                            </div>
                            <select name="distrito_id" value={values.distrito_id} onChange={handleChange}
                            className={'form-select' + (submitted && !values.distrito_id ? ' is-invalid' : '')}>
                                <option value="">Seleccionar</option>
                                {ubigeo.districts && ubigeo.districts.map(e=>
                                <option key={e.id} value={e.id}>{e.name}</option>
                                )}
                            </select>
                            {submitted && !values.distrito_id &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Teléfono fijo
                            </div>
                            <input type="text" name='telefono' maxLength={15} value={values.telefono} onChange={handleChange}
                            className={'form-control'} placeholder="Escribir"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Teléfono Celular*
                            </div>
                            <input type="text" name='celular' maxLength={15} value={values.celular} onChange={handleChange}
                            className={'form-control' + (submitted && !values.celular ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.celular &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Correo electrónico*
                            </div>
                            <input type="email" name='email' maxLength={150} value={values.email} onChange={handleChange}
                            className={'form-control' + (submitted && !values.email ? ' is-invalid' : '')} placeholder="Escribir"/>
                            {submitted && !values.email &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className="caja_trans">
                <div className="subtitulo">
                    Datos de acceso a la cuenta
                </div>
                <div className="formulario">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="campo">
                                <div className="txt">
                                    Nombre de usuario*
                                </div>
                                <input type="text" name='username' value={values.username} onChange={handleChange}
                                className={'form-control' + (submitted && !values.username ? ' is-invalid' : '')} placeholder="Escribir"/>
                                {submitted && !values.username &&
                                    <div className="invalid-feedback">Dato Obligatorio</div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <div className="campo">
                                <div className="txt">
                                    Contraseña*
                                </div>
                                <input type="password" name='password' value={values.password} onChange={handleChange}
                                className={'form-control' + (submitted && (!values.password || values.password.length<6) ? ' is-invalid' : '')} placeholder="Escribir"/>
                                {submitted && !values.password &&
                                    <div className="invalid-feedback">Dato Obligatorio</div>
                                }
                                {submitted && values.password && values.password.length<6 &&
                                    <div className="invalid-feedback">La clave debe ser alfanumerica (mínimo 6 caracteres)</div>
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="campo">
                                <div className="txt">
                                    Confirmar contraseña*
                                </div>
                                <input type="password" name='password_confirm' value={values.password_confirm} onChange={handleChange}
                                className={'form-control' + (submitted && (!values.password_confirm || values.password !== values.password_confirm) ? ' is-invalid' : '')} placeholder="Escribir"/>
                                {submitted && !values.password_confirm &&
                                    <div className="invalid-feedback">Dato Obligatorio</div>
                                }
                                {submitted && values.password_confirm && values.password !== values.password_confirm &&
                                    <div className="invalid-feedback">La clave de confirmación no coincide</div>
                                }
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={"campo_check" + (submitted && !values.acepto_terminos ? ' is-invalid' : '')}>
                                <input type="checkbox" id="campoAceptoTerminos" name="acepto_terminos" checked={values.acepto_terminos} onChange={handleChange}/>
                                <label htmlFor='campoAceptoTerminos' className={'custom-checkbox'}>
                                    <a href='#'>Acepto la política de privacidad de datos personales</a>
                                </label>
                            </div>
                            {submitted && !values.acepto_terminos &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {!validateFields() && submitted &&
                <ErrorFormAlert/>
            }

            <div className="botonera">
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        <div className="captcha">
                            <ReCAPTCHA ref={recaptcha} sitekey={config().recaptchaSiteKey} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="btn_yellow">
                            <a href="#" onClick={handleNextStep} className="full"></a>
                            Crear cliente
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
  )
}
