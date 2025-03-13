import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cmsActions } from '../../_actions'

import { Spinner } from '../../_components/Spinner';
import { assets, history, getField, urlSlug } from "../../_helpers";
import { Disclaimer } from '../shared/Disclaimer';
import { LoginLayer } from '../shared/LoginLayer';
import { PasswordLayer } from '../shared/PasswordLayer';
import { PwdResetLayer } from '../shared/PwdResetLayer';
import { VideoLayer } from '../shared/VideoLayer';
//import { HtmlContent } from '../../_components';

export const Home = ()=>{
    const account = useSelector(state => state.authentication.account)
    const cms = useSelector(state => state.cms)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        //dispatch(cmsActions.getHome())

    }, [])

    return(
        <section className="home">
			<h1>Home Page</h1>

            <LoginLayer showLogin={true}></LoginLayer>

        </section>
    )
}
