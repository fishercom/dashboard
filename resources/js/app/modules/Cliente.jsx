import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { parameterActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';

import { Form1 } from './partials/Form1';
import { Form2 } from './partials/Form2';
import { Gracias } from './partials/Gracias';

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
        <Spinner visible={clientes.registering} style={{position: 'fixed'}} text='Enviando...'></Spinner>
        <Spinner visible={clientes.loading} style={{position: 'fixed'}} text='Cargando...'></Spinner>
        <Form1 active={step==1} handleStep={handleStep}/>
        <Form2 active={step==2}/>
        {clientes.response_documentos &&
            <Gracias response={clientes.response_documentos}></Gracias>
        }
    </>
    )
}
