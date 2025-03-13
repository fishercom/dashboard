import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'

import { history } from '../_helpers'
import { alertActions, cmsActions } from '../_actions'
import { PrivateRoute } from '../_components'

import { Header } from './shared/Header'
import { Footer } from './shared/Footer'
import { Home } from "./modules/Home"
import { Cliente } from "./modules/Cliente"
import { Historial } from "./modules/Historial"
import { Politicas } from "./modules/Politicas"

import { Spinner } from '../_components/Spinner';

export const App=()=>{
  const cms = useSelector(state => state.cms)
  const alert = useSelector(state => state.alert)
  const account = useSelector((state) => state.authentication.account)
  const wrapper = !account? 'wrapper wrapper_login': ''
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(alertActions.clear())
    //dispatch(cmsActions.getPages())
  }, [])

  if(alert.message){
    switch(alert.type){
      case 'danger':
        toast.error(alert.message)
        break
      case 'success':
        toast.success(alert.message)
        break
    }
  }

  return (
    <>
    <Spinner visible={cms.loading} text='Cargando...'></Spinner>
    <BrowserRouter history={history}>
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/politicas" element={<Politicas/>}></Route>
          <Route exact path="/cliente_reset" element={<Home/>}></Route>
          <Route exact path="/cliente" element={<Cliente/>}></Route>
          <Route exact path='/historial' element={PrivateRoute(<Historial/>)}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
        position="bottom-center"
        toastOptions={
          {
            duration: 5000,
            style: {
              background: '#55595c',
              color: '#fff',
              padding: '20px'
            }
          }
        }
        />
        <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App;
