import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { assets, getField, urlSlug } from "../../_helpers";
import { Link } from 'react-router-dom'
import { cmsActions, accountActions, clienteActions } from '../../_actions'

export const Header = ()=>{

  const account = useSelector(state => state.authentication.account)
  const cms = useSelector(state => state.cms)
  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const menu = [
    {title: 'Registrar documento', path: '/cliente'},
    {title: 'Historial de documentos', path: '/historial'},
  ]

  useEffect(() => {
    //dispatch(cmsActions.getPages())

  }, [])

  const handleMenu = () => {
    setShowMenu(!showMenu)
    if(!showMenu)
        document.body.classList.add('nonescroll')
    else
        document.body.classList.remove('nonescroll')
  }

  const handleItem = () => {
    document.body.classList.remove('nonescroll')
    setShowMenu(false)
  }

  const handleLogout = () => {
    document.body.classList.remove('nonescroll')
    dispatch(accountActions.logout());
    dispatch(clienteActions.resetForm())
    setShowMenu(false)
  }

  const greetings = (d) =>{
    return d.tipo_persona=='JURIDICA'? d.nombre: d.nombre.concat(' ', d.apellido_paterno, ' ', d.apellido_materno)
  }

  return (
<header className={!account ? "nomenu": ""}>
 	<div className="barra_superior">
        {account &&
            <div className="usuario">{ greetings(account) } <i className="far fa-user-circle"></i></div>
        }
        <div className="logo">
            <Link to="/">
                <img src={ assets("/images/logo.jpg") } alt="Mesa de Parte"/>
            </Link>
        </div>
        <h1>
            Mesa de Partes Virtual
        </h1>
        <div className="sanguche" onClick={handleMenu}>
            <div className="lines"></div>
            <div className="lines"></div>
            <div className="lines"></div>
        </div>

        <nav className={showMenu? 'activo': ''}>
            <div className="btn_close" onClick={handleMenu}></div>
            <ul className="menu">
                {menu.map((e, index)=>
                <li key={index}>
                    <Link className="full" to={e.path} onClick={handleItem}></Link>
                    {e.title}
                </li>
                )}
            </ul>

            <div className="inferior">
                <div className="cerrar_sesion">
                    <Link className="full" to="/" onClick={handleLogout}></Link>
                    Cerrar Sesión
                </div>
                <div className="btn_salir">
                    <Link className="full" to="/" onClick={handleLogout}></Link>
                    <img src={ assets("/images/ico-salir.png") }/>
                </div>
            </div>
        </nav>
    </div>
</header>
)}
