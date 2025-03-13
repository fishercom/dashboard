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
<header>
    <p>Header</p>
    <nav>
        <ul className="menu">
            {menu.map((e, index)=>
            <li key={index}>
                <Link to={e.path} onClick={handleItem}>{e.title}</Link>
            </li>
            )}
        </ul>
    </nav>
</header>
)}
