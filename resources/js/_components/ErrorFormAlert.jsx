import React from 'react'

export const ErrorFormAlert = (props)=>{
    const msg = props.msg?? 'Algunos datos no han sido completados correctamente, por favor verifíque el formulario antes de continuar.'
    const style = props.style?? {}
    return <div className='alert alert-danger' style={style} role="alert">{msg}</div>
}
