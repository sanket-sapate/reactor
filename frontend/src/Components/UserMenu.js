import {  Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import config from '../config';
import { useDispatch } from 'react-redux';
import { userDetailAction } from '../Redux/action';
import { toast } from 'react-toastify';
import { BookmarkIcon, FolderIcon,Cog6ToothIcon } from '@heroicons/react/24/outline';
const navigation = [
    {name:'Collection',icon:FolderIcon,to:'/user/collection'},
    {name:'Favorites',icon:BookmarkIcon,to:'/user/favorite'},
    {name:'Setting',icon:Cog6ToothIcon,to:'/user/settings'}
]
function UserMenu({user}) {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    function logout(){
      config.DELETE_COOKIE('auth-token')
      dispatch(userDetailAction(null))
      toast.success('Logout Successful',config.TOAST_UI)
    }
    return <div className="w-56 text-right">
        <div onMouseEnter={()=>setOpen(true)}>
            <Link to="/user/dashboard" onClick={()=>setOpen(false)}>
                <div className="flex align-baseline items-center justify-end">
                    <img
                    className="h-8 rounded-full w-auto"
                    src={user.image||config.DEFAULT_AVATAR}
                    alt={user.name}
                    referrerPolicy='no-referrer'
                    />
                    <div className="text-sm font-semibold leading-6 ml-4 text-gray-900">{user.name}</div>
                </div>
            </Link>
        </div>
        {open ?<div>
        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
            <div onMouseLeave={()=>setOpen(false)} className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md ring-black ring-opacity-5 focus:outline-none" aria-labelledby="headlessui-menu-button-:r1:" id="headlessui-menu-items-:rk:" role="menu" tabIndex="0" data-headlessui-state="open">
          <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" aria-labelledby="headlessui-menu-button-:r1:" id="headlessui-menu-items-:rk:" role="menu" tabIndex="0" data-headlessui-state="open">
            <div className="px-1 pt-1 " role="none">
                {
                    navigation.map((item)=>{
                        return <Link to={item.to} className=' group flex w-full items-center rounded-md px-2 py-2 text-indigo-500 text-sm hover:bg-indigo-400 hover:text-slate-50'>
                            <item.icon className='mr-3 flex-shrink-0 h-6 w-6 text-inherit'/>
                            {item.name}                            
                        </Link>
                    })
                }
                
            </div>
            <div className="px-1 pb-1" >
                <button onClick={()=>{console.log(1);logout()}} className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-400 hover:text-slate-50" tabIndex="-1">
                    <svg className="mr-2 h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H16V10" stroke="rgb(79,70,229)" strokeWidth="2"></path><path d="M16 4L8 12" stroke="rgb(79,70,229)" strokeWidth="2"></path><path d="M8 6H4V16H14V12" stroke="rgb(79,70,229)" strokeWidth="2"></path>
                    </svg>
                    Logout
                </button>
            </div>
          </div>
          </div>
        </Transition>
        </div>:<></>}
    </div>
    }

export default UserMenu;