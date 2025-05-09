import * as React from "react"
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


function PaginationNav({...props}): React.ComponentProps {
    const items = props.data;
    return (
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Pag.
                <span className="font-semibold text-gray-900 dark:text-white px-1">{items.current_page}</span>
                de
                <span className="font-semibold text-gray-900 dark:text-white px-1">{items.last_page}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <a href={items.prev_page_url} className="flex items-center justify-center h-full py-1.5 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Anterior</span>
                        <ChevronLeft width={15}/>
                    </a>
                </li>
                {items.links.filter(e=>e.label!='&laquo; Previous' && e.label!='Next &raquo;').map((e, index)=>
                <li key={index}>
                    <Link href={e.url} className='flex items-center justify-center text-sm py-2 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>{e.label}</Link>
                </li>
                )}
                <li>
                    <a href={items.next_page_url} className="flex items-center justify-center h-full py-1.5 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Siguiente</span>
                        <ChevronRight width={15}/>
                    </a>
                </li>
            </ul>
        </nav>
  )
}

export { PaginationNav }
