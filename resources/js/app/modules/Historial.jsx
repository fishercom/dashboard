import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clienteActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';

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

    return (
    <>
        <Spinner visible={clientes.loading} text='Cargando...'></Spinner>
        <section>
			Historial
		</section>
    </>
    )
}
