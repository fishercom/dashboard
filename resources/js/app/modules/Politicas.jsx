import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const Politicas = ()=>{
    const account = useSelector(state => state.authentication.account)
    const cms = useSelector(state => state.cms)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        document.getElementById('app').classNameName= 'wrapper wrapper_internas';
        //dispatch(cmsActions.getHome())
        window.scrollTo(0, 0)
    }, [])

    return(
        <>
        <section>
            Políticas
		</section>
        </>
    )
}
