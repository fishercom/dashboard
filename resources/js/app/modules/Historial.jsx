import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clienteActions } from '../../_actions'
import { parse, parseISO, format, isValid } from 'date-fns';

import { Spinner } from '../../_components/Spinner';
import { Detalle } from './partials/Detalle';

export const Historial = ()=>{
    const clientes = useSelector(state => state.clientes)
    const dispatch = useDispatch()

    const [showDetail, setShowDetail] = useState(false)
    const [detalle, setDetalle] = useState({})

    useEffect(() => {
        document.getElementById('app').className= 'wrapper wrapper_internas';

        dispatch(clienteActions.getDetalleList())
        //console.log('initial')
    }, [])

    const handleDetalle = (d) =>{
        setDetalle(d)
        setShowDetail(!showDetail)
    }

    const handleCloseDetalle = () =>{
        setDetalle({})
        setShowDetail(!showDetail)
    }

    return (
    <>
        <Spinner visible={clientes.loading} style={{position: 'fixed'}} text='Cargando...'></Spinner>
        <section className="seccion_principal">
			<div className="container historial_container">
				<h2>
					Historial de documentos
				</h2>
                <div className="tabla_historial">
                    <div className="caja_trans">
                        {clientes.detalles &&
                        <table align="center" border="0" cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                                <th>CÓDIGO <br/> DOCUMENTO </th>
                                <th>TIPO DE DOCUMENTO</th>
                                <th>ASUNTO</th>
                                <th>FECHA DOCUMENTO</th>
                                <th>ADJUNTOS</th>
                            </tr>
                            {clientes.detalles.map(item=>{
                                const fecha = parseISO(item.fecha_documento)

                                return (
                                <tr key={item.id} className="btn_layer_detalle" onClick={e=>handleDetalle(item)}>
                                    <td>{item.codigo_interno}</td>
                                    <td>{item.tipo_documento.name}</td>
                                    <td>
                                        {item.asunto}
                                    </td>
                                    <td>{format(fecha, 'dd. MM. y')}</td>
                                    <td>{(item.documentos).length+1}</td>
                                </tr>
                                )
                            })
                            }
                          </tbody>
                        </table>
                        }
                    </div>
                </div>

			</div>
		</section>

        {showDetail &&
            <Detalle detalle={detalle} handleCloseDetalle={handleCloseDetalle} />
        }

    </>
    )
}
