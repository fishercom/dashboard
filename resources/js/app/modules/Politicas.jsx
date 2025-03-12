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
        <section className="seccion_principal">
			<div className="container politicas">
				<h2>
					Política de Privacidad
				</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<h4>Política 1</h4>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quas accusantium mollitia, ad laboriosam laborum a iure, aliquam nisi ipsa, non blanditiis nihil pariatur odio veniam? Incidunt iure nostrum expedita.</p>
				<h4>Política 2</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed molestiae nobis sit nam a cumque aut id. Reprehenderit corrupti laborum eius maiores suscipit debitis quasi cumque voluptatibus non consequatur. Numquam.</p>
				<ul>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veniam alias molestias officiis.</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veniam alias molestias officiis.</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veniam alias molestias officiis.</li>
				</ul>
				<h4>Política 3</h4>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed molestiae nobis sit nam a cumque aut id. Reprehenderit corrupti laborum eius maiores suscipit debitis quasi cumque voluptatibus non consequatur. Numquam.</p>
				<ol>
					<li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, possimus. Nostrum alias fuga consequuntur ipsa tempora, adipisci sit nam sapiente culpa atque numquam. Minima, eaque esse. Odio beatae hic tenetur?</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veniam alias molestias officiis.</li>
					<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam veniam alias molestias officiis.</li>
				</ol>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed molestiae nobis sit nam a cumque aut id. Reprehenderit corrupti laborum eius maiores suscipit debitis quasi cumque voluptatibus non consequatur. Numquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed molestiae nobis sit nam a cumque aut id. Reprehenderit corrupti laborum eius maiores suscipit debitis quasi cumque voluptatibus non consequatur. Numquam.</p>
			</div>
		</section>
        </>
    )
}
