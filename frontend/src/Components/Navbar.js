import React from "react";
import { Bars3Icon, FolderIcon,BookmarkIcon,Cog6ToothIcon,ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {  XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import config, { constants } from "../config";
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { userDetailAction } from '../Redux/action';
const userNavigation = [
  {name:'Collection',icon:FolderIcon,to:'/user/collection'},
  {name:'Favorites',icon:BookmarkIcon,to:'/user/favorite'},
  {name:'Setting',icon:Cog6ToothIcon,to:'/user/settings'}
]

const Navbar = ()=>{
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigation = [
        { name: 'Departments', href: '/department' },
        { name: 'Contribute', href: '/contribute' },
        { name: '3D Campus', href: '/campus' }
    ]
    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user)
    function logout(){
      config.DELETE_COOKIE('auth-token')
      dispatch(userDetailAction(null))
      toast.success('Logout Successful',config.TOAST_UI)
    }
    return <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Reactor</span>
              <img
                referrerPolicy="no-referrer"
                className="h-8 w-auto"
                src="https://upload.wikimedia.org/wikipedia/en/3/36/VNIT_logo.jpeg?20210930001635"
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user?<UserMenu user={user}/>:<Link to="/signin" className="text-sm text-indigo-500 leading-6 font-bold">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>}
          </div>
        </nav>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link onClick={() => setMobileMenuOpen(false)} to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src={constants.appLogo}
              alt=""
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  key={item.name}
                  to={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              {user?<div>
                <Link onClick={() => setMobileMenuOpen(false)} to="/user/dashboard">
                <div className="flex align-baseline items-center justify-start">
                    <img
                    className="h-8 rounded-full w-auto"
                    src={user.image||config.DEFAULT_AVATAR}
                    alt={user.name}
                    />
                    <div className="text-sm font-semibold leading-6 ml-4 text-gray-900">{user.name}</div>
                </div>
            </Link>
            <div className="mt-4  origin-top-right rounded-md bg-white   focus:outline-none" aria-labelledby="headlessui-menu-button-:r1:" id="headlessui-menu-items-:rk:" role="menu" tabIndex="0" data-headlessui-state="open">
                {
                    userNavigation.map((item)=>{
                        return <Link to={item.to} key={item.name} onClick={() => setMobileMenuOpen(false)} className='mt-4 group flex w-full items-center rounded-md px-2 py-2  text-sm hover:bg-indigo-500 hover:text-slate-50 '>
                            <item.icon className='mr-3 flex-shrink-0 h-6 w-6 text-indigo-600 group-hover:text-slate-50'/>
                            {item.name}                            
                        </Link>
                    })
                }
                <button  onClick={() => {setMobileMenuOpen(false);logout()}} className="text-gray-900 mt-4 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500 hover:text-slate-50" tabIndex="-1">
                    <ArrowLeftOnRectangleIcon className='mr-3 flex-shrink-0 h-6 w-6 text-indigo-600 group-hover:text-slate-50'/>
                    Logout
                </button>
          </div>
            </div>:<Link
                onClick={() => setMobileMenuOpen(false)}
                to="/signin"
                className="-mx-3 block rounded-lg text-indigo-500 px-3 py-2.5 text-base font-bold leading-7 hover:bg-gray-50"
              >
                Log in
              </Link>}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  </header>
}

export default Navbar