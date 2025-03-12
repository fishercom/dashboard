import React, { useState, useEffect, useRef } from 'react'
import { parseISO, format, isValid } from 'date-fns';

import { assets, history, getExtract } from "../../../_helpers";

export const Detalle = (props)=>{
    const detalle = props.detalle
    const fecha = parseISO(detalle.fecha_documento)

    useEffect(() => {
        console.log(detalle)
    }, [])

    const handleCloseDetalle = (e) =>{
        props.handleCloseDetalle()
    }

return (

<div className="layer_standard layer_detalle" style={{ display: 'block' }}>
    <div className="sombra_layer"></div>
    <div className="caja">
        <div className="btn_close" onClick={handleCloseDetalle}></div>

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="titulo">
                        Código interno: {detalle.codigo_interno} <br/><br/>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="caja_celeste">
                        <div className="tit">
                            Datos del documento
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="celeste">
                                    Tipo de documento:
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="txt">
                                    {detalle.tipo_documento?.name}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="celeste">
                                    Número de documento:
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="txt">
                                    {detalle.nro_documento}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="celeste">
                                    Fecha de documento:
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="txt">
                                    {format(fecha, 'dd. MM. y')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="caja_celeste">
                      <div className="scroll descripcion">
                        <div className="tit">
                            Datos del documento
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="row row_item">
                                    <div className="col-sm-3">
                                        <div className="celeste">
                                            Asunto de la solicitud:
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="txt">
                                            {detalle.asunto}
                                        </div>
                                    </div>
                                </div>
                                <div className="row row_item">
                                    <div className="col-sm-3">
                                        <div className="celeste">
                                            Descripción:
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="txt">
                                            {detalle.descripcion}
                                        </div>
                                    </div>
                                </div>
                                <div className="row row_item">
                                    <div className="col-sm-3">
                                        <div className="celeste">
                                            Referencias:
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="txt">
                                            {detalle.referencias}
                                        </div>
                                    </div>
                                </div>
                                <div className="row row_item">
                                    <div className="col-sm-3">
                                        <div className="celeste">
                                            Observaciones
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="txt">
                                            {detalle.observaciones}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="caja_celeste height100">
                        <div className="tit">
                            Documentos:
                        </div>

                        {detalle.documento &&
                        <div className="link" style={{paddingTop: 'inherit'}}>
                            <a href={detalle.documento} target='_blank' className="full"></a>
                            <img src="images/ico-anexos.png"/>
                            Documento Principal
                        </div>
                        }
                        {detalle.documentos.length>0 &&
                        <>
                        <div className="tit">
                            Anexos:
                        </div>
                        {detalle.documentos.map((d, index)=>
                        <div className="link">
                            <a href={d.documento} target='_blank' className="full"></a>
                            <img src="images/ico-anexos.png"/>
                            Anexo {index+1}
                        </div>
                        )}
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="clear"></div>
    </div>
</div>
)}
