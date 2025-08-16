import { useState, useEffect } from 'react';
import { type BreadcrumbItem} from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ModuleLayout from '@/layouts/module/layout';
import { format } from 'date-fns'
import { Notify, Pagination } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check, Search, Plus } from 'lucide-react';
import { Icon } from '@/components/icon';
import { Input } from '@headlessui/react';
import { PaginationNav } from '@/components/ui/pagination-nav';
import { getNotifies, deleteNotify } from '@/services/notifies';

export default function Index() {

    interface NotifyPagination extends Omit<Pagination, 'data'> {data: Notify[]};

    const { items } = usePage<{ items: NotifyPagination }>().props;
    const [ query, setQuery ] = useState({s: ''});

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Cuentas de Correo',
            href: '/admin/notifies/index',
        },
    ];

    useEffect(() => {
        if(query.s){
            getNotifies(query);
        }
    }, [query]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        setQuery({s: value});
    }

    const deleteNotifyHandler = (id: number) => {
        deleteNotify(id);
    }

    return (
        <ModuleLayout breadcrumbs={breadcrumbs} title="Cuentas de Correo" description="Administrar las notificaciones del sistema">
            <div className="relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-4">
                    <div className="w-full md:w-3/4">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                                    <Search/>
                                </div>
                                <Input type='text' autoFocus value={query.s??''} onChange={handleSearch} className="focus-within:outline-2 focus-within:outline-gray-400 border border-gray-500 text-sm rounded-md block w-full pl-10 p-2" placeholder="Buscar" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button type="button" className="flex items-center justify-center bg-primary-700 font-medium text-sm px-4 py-2">
                            <Plus/>
                            <Link href='/admin/notifies/create'>Agrgar Cuenta</Link>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3 rounded-l-md">Name</th>
                                <th scope="col" className="px-4 py-3">Active</th>
                                <th scope="col" className="px-4 py-3">Created Date</th>
                                <th scope="col" className="px-4 py-3">Updated Date</th>
                                <th scope="col" className="px-4 py-3 rounded-r-md"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {items.data.map((item: Notify)=>{
                            return(
                            <tr key={ item.id } className="border-b dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ item.name }</th>
                                <td className="px-4 py-3">{ item.active? <Check/>: <></> }</td>
                                <td className="px-4 py-3">{ format(item.created_at, 'dd/MM/yyyy HH:mm') }</td>
                                <td className="px-4 py-3">{ format(item.updated_at, 'dd/MM/yyyy HH:mm') }</td>
                                <td className="px-4 py-3 flex items-center justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="p-3">
                                                Actions
                                                <Icon iconNode={ChevronDown} className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end">
                                            <DropdownMenuItem asChild>
                                                <Link className="block w-full" href={route('notifies.edit', item.id)} as="button" prefetch>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link className="block w-full" href='#' onClick={()=>deleteNotifyHandler(item.id)} as="button" prefetch>
                                                    Delete
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                </div>
                {items.links &&
                <PaginationNav data={items}/>
                }
            </div>
        </ModuleLayout>
    );
}
