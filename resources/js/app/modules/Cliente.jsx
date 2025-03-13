import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parameterActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';

export const Cliente = ()=>{
    const clientes = useSelector(state => state.clientes)
    const [step, setStep] = useState(1);
    const dispatch = useDispatch()

    useEffect(() => {
        document.getElementById('app').className= 'wrapper wrapper_internas';

        dispatch(parameterActions.getList())
        //console.log('initial')
    }, [])

    const handleStep = (value)=> {
        //console.log(value)
        setStep(value)
    }

    return (
    <>
        <Spinner visible={clientes.registering} text='Enviando...'></Spinner>
        <section>
            Cliente
        </section>
    </>
    )
}
