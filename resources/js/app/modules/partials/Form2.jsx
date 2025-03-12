import React, { useState, useEffect, useRef, forwardRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parameterActions, clienteActions, accountActions } from '../../../_actions'
import { OptionNoAplica, ErrorFormAlert} from "../../../_components";
import { assets, history, getField, checkDateField } from "../../../_helpers";
import { parse, format, isValid } from 'date-fns';

import DatePicker, { registerLocale } from "react-datepicker";
import "./../../../../css/react-datepicker.css"

import dateFnsFormat from 'date-fns/format'
import es from "date-fns/locale/es";
registerLocale("es", es);

import { documentoViewmodel, documentoListViewModel } from '../../../_viewmodels'


export const Form2 = (props)=>{
    const active = props.active
    const cms = useSelector(state => state.cms)
    const parameters = useSelector(state => state.parameters)
    const [values, setValues] = useState({...documentoViewmodel})
    const [fechaDocumento, setFechaDocumento] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const style_form = {'display': !active?'none': 'block'}

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clienteActions.getNew({...documentoViewmodel}))
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (e, index=0)=> {
        let { name, value } = e.target
        switch(name){
            case 'anonimo':
                name = 'anonimo'
                value = e.target.checked? '1': ''
                break
            case 'documentos.tipo_documento_id':
            case 'documentos.nro_documento':
            case 'documentos.observaciones':
                const arr = name.split('.')
                const documentos = [...values['documentos']]
                documentos[index]={...documentos[index], [arr[1]]: value}
                name = arr[0]
                value = documentos
                break
        }
        //console.log(name, value)
        setValues(values => ({ ...values, [name]: value }))
        console.log('values', values)
    }

    const handleDocumentoChange = (e)=> {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = ()=>{
            const documento = {'name': file.name, 'file': reader.result.toString()}
            setValues(values => ({ ...values, ['documento']: documento }))
        }
        reader.readAsDataURL(file)
    }

    const handleDocumentosChange = (e, index)=> {
        const documentos = values['documentos']
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = ()=>{
            documentos[index] = {...documentos[index], ['documento'] : {'name': file.name, 'file': reader.result.toString()}}
            setValues(values => ({ ...values, ['documentos']: documentos }))
        }
        reader.readAsDataURL(file)
    }

    const handleDocumentosAddClick = (e)=>{
        e.preventDefault();
        const documentos = values['documentos']
        if(documentos.length>=5) return;

        documentos.push({...documentoListViewModel})
        console.log(documentos)
        setValues(values => ({ ...values, ['documentos']: documentos }))
    }

    const handleRemoveDocumentoClick = (e, index) => {
        const documentos = values['documentos']
        if(documentos.length>0 && confirm("Esta seguro que desea borrar toda la información de este documento?")){
            setValues(values => ({ ...values, ['documentos']: documentos.filter((f, i)=>index!=i) }))
        }
    }

    const validateFields = ()=>{
        //return true
        return values.tipo_documento_id
            && values.nro_documento
            && values.fecha_documento
            && values.asunto
            && values.descripcion
            && values.referencias
            && values.documento
            && values.documento.name
            && values.documento.file

            //&& values.documento
        }

    const handleNextStep = (e)=>{
        console.log(values);
        setSubmitted(true);
        if (validateFields()) {
          setSubmitted(false);
          dispatch(clienteActions.documentos(values))
        }
    }

    const handleFechaDocumento = (d)=> {
        setFechaDocumento(d)
        setValues(values => ({ ...values, ['fecha_documento']: dateFnsFormat(d, 'Y-M-d') }))
    }

    const CustomFechaDocumento = forwardRef((props, ref) => (
      <div className="gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group mb-3" role="wrapper">
        <input {...props} ref={ref} className={'form-control' + (submitted && !values.fecha_documento ? ' is-invalid' : '')} role="input"/>
        <button className="btn btn-outline-secondary border-left-0" type="button" onClick={props.onClick} role="right-icon"><i className="gj-icon">event</i></button>
        {submitted && !values.fecha_documento &&
            <div className="invalid-feedback">Dato Obligatorio</div>
        }
      </div>
    ))

    const NroDocumentoLegend = () => (
        <small>De no contar con un código de documento, por favor coloca las siglas 'SN'.</small>
    )

    return (
<section className="seccion_principal" style={style_form}>
    <div className="container">
        <h2>
            Registro del documento
        </h2>
        <div className="subtitulo">
            Datos del documento
        </div>

        <div className="formulario">
            <div className="row">
                <div className="col-md-6">
                    <div className="campo">
                        <div className="txt">
                            Tipo de documento*
                        </div>
                        <select name="tipo_documento_id" value={values.tipo_documento_id} onChange={handleChange}
                            className={'form-select' + (submitted && !values.tipo_documento_id ? ' is-invalid' : '')}>
                            <option value="">Seleccionar</option>
                            {parameters.items && parameters.items.filter(e=>e.alias=='tipo_documento').map(e=>
                                <option key={e.id} value={e.id}>{e.name}</option>
                            )}
                        </select>
                        {submitted && !values.tipo_documento_id &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="campo">
                        <div className="txt">
                            Código de documento*
                        </div>
                        <input type="text" name="nro_documento" maxLength={100} value={values.nro_documento} onChange={handleChange}
                            className={'form-control' + (submitted && !values.nro_documento ? ' is-invalid' : '')}/>
                        <NroDocumentoLegend />
                        {submitted && !values.nro_documento &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="campo">
                        <div className="txt">
                            Fecha de documento
                        </div>
                        <DatePicker selected={fechaDocumento} dateFormat="d/M/Y" placeholderText="Fecha de documento"
                            onChange={handleFechaDocumento} onChangeRaw={(e) => e.preventDefault()}
                            locale="es" customInput={<CustomFechaDocumento/>}/>
                    </div>
                </div>
            </div>
        </div>

        <div className="subtitulo">
            Descripción de la solicitud
        </div>

        <div className="formulario">
            <div className="row">
                <div className="col-md-6">
                    <div className="campo">
                        <div className="txt">
                            Asunto de la solicitud*
                        </div>
                        <input type="text" placeholder="Escribir" name="asunto" maxLength={255} value={values.asunto} onChange={handleChange}
                            className={'control' + (submitted && !values.asunto ? ' is-invalid' : '')}/>
                        {submitted && !values.asunto &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="campo">
                        <div className="txt">
                            Descripción*
                        </div>
                        <textarea placeholder="Escribir" name="descripcion" value={values.descripcion} onChange={handleChange}
                            className={'control' + (submitted && !values.descripcion ? ' is-invalid' : '')}/>
                        {submitted && !values.descripcion &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
                <div className="col-12">
                    <div className="campo">
                        <div className="txt">
                            Referencias*
                        </div>
                        <textarea placeholder="Escribir" name="referencias" value={values.referencias} onChange={handleChange}
                            className={'control' + (submitted && !values.referencias ? ' is-invalid' : '')}/>
                        {submitted && !values.referencias &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="campo">
                        <div className="txt">
                            Subir el documento principal* {' '}
                            <span className='text-info small'>Sólo archivos .pdf (carga máxima 30 MB)</span>
                        </div>
                        <div className={"campo_file" + (submitted && !values.documento?.file ? ' is-invalid' : '')}>
                            <input type="file" name='documento' accept=".pdf"
                            onChange={handleDocumentoChange}/>
                        </div>
                        {submitted && !values.documento?.file &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                </div>
            </div>

            <div className="formulario">
                <div className="row">
                    <div className="col-12">
                        <div className="campo">
                            <div className="txt">
                                Observaciones
                            </div>
                            <textarea placeholder="Escribir" name="observaciones" value={values.observaciones}
                                onChange={handleChange} className={'form-control'}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <h2>
            Anexos
        </h2>
        <div className="subtitulo">
            ¿Desea adjuntar  otro documento que complemente su solicitud?
        </div>

        <div className="formulario">
            {values.documentos.map((e, index)=>
            <div className="c_documentos" key={index}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Tipo de documento*
                            </div>
                            <select name="documentos.tipo_documento_id" value={e['tipo_documento_id']} onChange={(d)=>handleChange(d, index)}
                            className={'form-select' + (submitted && !e['tipo_documento_id'] ? ' is-invalid' : '')}>
                                <option value="">Seleccionar</option>
                                {parameters.items && parameters.items.filter(e=>e.alias=='tipo_documento').map(e=>
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                )}
                            </select>
                            {submitted && !e['tipo_documento_id'] &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="campo">
                            <div className="txt">
                                Código de documento*
                            </div>
                            <input type="text" name="documentos.nro_documento" maxLength={100} value={e['nro_documento']} onChange={(d)=>handleChange(d, index)}
                            className={'form-select' + (submitted && !e['nro_documento'] ? ' is-invalid' : '')}/>
                            <NroDocumentoLegend />
                            {submitted && !e['nro_documento'] &&
                                <div className="invalid-feedback">Dato Obligatorio</div>
                            }
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col-11">
                        <div style={{marginBottom: '0px'}} className={"campo"+(submitted && !e['documento']['file'] ? ' is-invalid' : '')}>
                            <div className="txt">
                                Subir archivo* {' '}
                                <span className='text-info small'>Archivos .pdf, .doc, .xls, .zip (carga máxima 30 MB)</span>
                            </div>
                            <div className="campo_file">
                                <input type="file" name='documentos.documento' accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(d)=>handleDocumentosChange(d, index)}/>
                            </div>
                        </div>
                        {submitted && !e['documento']['file'] &&
                            <div className="invalid-feedback">Dato Obligatorio</div>
                        }
                    </div>
                    <div className="col-1">
                        <img src="images/ico-trash.svg" onClick={(d)=>handleRemoveDocumentoClick(d, index)} className="ico_trash"/>
                    </div>
                </div>
                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-12">
                        <div className="campo">
                            <div className="txt">
                                Observaciones
                            </div>
                            <textarea placeholder="Escribir" name="documentos.observaciones" value={e['observaciones']} onChange={(d)=>handleChange(d, index)}
                                className={'form-control'}/>
                        </div>
                    </div>
                </div>
            </div>
            )}

            <div className="row">
                <div className="col-12">
                    <div className="caja_adjuntar_mas_documentos">
                        <div className="boton_adjuntar" onClick={handleDocumentosAddClick}>
                            Adjuntar más anexos
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="botonera">
            <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                    <div className="btn_yellow btn_registrar_documento">
                        <a href="#" onClick={handleNextStep} className="full"></a>
                        Registrar documento
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
  )
}
