import React,{ Fragment, useEffect, useState,lazy,Suspense } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { FolderIcon,
      HomeIcon,
      QuestionMarkCircleIcon,
      Bars3Icon,
      XMarkIcon,
      BookmarkIcon,
      VideoCameraIcon,
      MagnifyingGlassIcon,
      Cog6ToothIcon,
      ChevronDownIcon
    } from '@heroicons/react/24/outline'
import { useSelector } from "react-redux";
import config,{constants} from '../config'
import {Accordion,AccordionHeader,AccordionBody } from '@material-tailwind/react'
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComp from "./LoadingComp";
const Dashboard = lazy ( ()=>import('./UserPaths/Dashboard'))
const Setting = lazy ( ()=>import('./UserPaths/Setting'))
const Collection = lazy ( ()=>import('./UserPaths/Collection'))
const Favorites = lazy ( ()=>import('./UserPaths/Favorites'))
const Help = lazy ( ()=>import('./UserPaths/Help'))
const Tutorial = lazy ( ()=>import('./UserPaths/Tutorial'))
const Account = lazy (()=>import ('./Setting/Account'))
const setting = [
  {name:'Account',href:'/user/setting/account',current:'account'},
  {name:'Change Password',href:'/user/setting/changepassword',current:'changepassword'},
]
const navigation = [
    { name: 'Dashboard', href: '/user/dashboard', icon: HomeIcon, current:'dashboard'  },
    { name: 'Setting', href: '/user/setting', icon: Cog6ToothIcon, current:'setting'  },
    { name: 'Collection', href: '/user/collection', icon: FolderIcon, current:'collection' },
    { name: 'Favorites', href: '/user/favorite', icon: BookmarkIcon, current:'favorite'  },
    { name: 'Help', href: '/user/help', icon: QuestionMarkCircleIcon, current:'help'  },
    { name: 'Tutorial', href: '/user/tutorial', icon: VideoCameraIcon, current:'tutorial' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  export default function Profile() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = useSelector((store)=>store.user)
    const path = useParams()
    const navigate = useNavigate()
    const [accord,setAccord] = useState(false)
    useEffect(()=>{
      if(window.location.pathname.includes('setting')){
        setAccord(true)
      }
      setTimeout(()=>{
        if(window.location.pathname==='/user'){
          navigate('dashboard')
        }
      },700)
    },[setAccord,navigate])
    function renderSwitch(){
      switch(path.section){
          case 'dashboard':
            return <Dashboard/>;
          case 'setting':
            return <Setting/>;
          case 'collection':
            return <Collection/>;
          case 'favorite':
            return <Favorites/>;
          case 'help':
            return <Help/>;
          case 'tutorial':
            return <Tutorial/>;
          default:
            switch(path.settingsection){
              case 'account':
                return <Account/>
              default:
                return <></>
            }                       
      }
    }
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-100">
          <body class="h-full">
          ```
        */}
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="absolute inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-600">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <Link to="/">
                        <img
                        className="h-8 w-auto"
                        src={constants.appLogo}
                        alt="Workflow"
                        />
                       </Link>
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map((item,i) => {
                        if(i===1){
                          return <Accordion key={item.name} open={accord}>
                            <AccordionHeader onClick={()=>{setAccord((state)=>!state)}} className="text-white  border-0 hover:bg-indigo-700 hover:bg-opacity-75 group flex items-center px-2 py-2 text-sm font-medium rounded-md"><item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"/>{item.name}<div className="flex-grow flex justify-end"><ChevronDownIcon className="flex-shrink-0 h-6 w-6 text-indigo-300"/></div></AccordionHeader>
                            <AccordionBody>
                                {setting.map((item)=>{return <Link
                                onClick={()=>setSidebarOpen(false)}
                                  key={item.name}
                                  to={item.href}
                                  className={classNames(
                                    item.current===path.settingsection ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-700 hover:bg-opacity-75',
                                    'group flex ml-14 items-center px-2 py-2 text-sm font-medium rounded-md'
                                  )}
                                >
                                  {item.name}
                                </Link>})}
                            </AccordionBody>
                          </Accordion>
                        }
                        return(
                        <Link 
                          onClick={()=>setSidebarOpen(false)}
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current === path.section
                              ? 'bg-indigo-800 text-white'
                              : 'text-white hover:bg-indigo-700 hover:bg-opacity-75',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                          {item.name}
                        </Link>
                      )})}
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
                    <Link to="/" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={user?.image||config.DEFAULT_AVATAR}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">{user?.name||'Full Name'}</p>
                          <p className="text-sm font-medium text-indigo-200 group-hover:text-white">@{user?._id||'username'}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>
  
          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 bg-indigo-600">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src={constants.appLogo}
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item,i) => {
                    if(i===1){
                      return <Accordion key={item.name} open={accord}>
                        <AccordionHeader onClick={()=>{setAccord((state)=>!state)}} className={classNames(
                        path.settingsection && !accord ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-700 hover:bg-opacity-75',
                        'border-0 mb-2 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}><item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"/>{item.name}<div className="flex-grow flex justify-end"><ChevronDownIcon className="flex-shrink-0 h-6 w-6 text-indigo-300"/></div></AccordionHeader>
                        <AccordionBody>
                            {setting.map((item)=>{return <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current===path.settingsection ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-700 hover:bg-opacity-75',
                                'group mb-2 flex ml-14 items-center px-2 py-2 text-sm font-medium rounded-md'
                              )}
                            >
                              {item.name}
                            </Link>})}
                        </AccordionBody>
                      </Accordion>
                    }
                    return(
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current===path.section ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-700 hover:bg-opacity-75',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                      {item.name}
                    </Link>
                  )})}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
                <Link to="/" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user?.image||config.DEFAULT_AVATAR}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{user?.name || 'Full Name'}</p>
                      <p className="text-xs font-medium text-indigo-200 group-hover:text-white">@{user?._id||'username'}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:pl-64 flex  flex-1 border-b-2 border-b-gray-200">
            <div className="sticky top-0 z-10 flex md:hidden px-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100" style={{alignItems:'center'}}>
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="md:hidden sticky border-l-2 ml-6 my-3"></div>
            <main className="flex-1 sticky">
              <div className=" flex py-5" style={{alignItems:'center'}}>
                <div className="flex px-5" style={{alignItems:'center'}}>
                  <MagnifyingGlassIcon className="mr-3 flex-shrink-0 h-5 w-5 text-indigo-300" aria-hidden="true"/>
                  <input type="text" placeholder="Search..." className="ml-1 focus-visible:outline-none w-full" />
                </div>
              </div>
            </main>
          </div>
          <div className="md:pl-64">
            <div className="p-3">
              <Suspense fallback={<LoadingComp/>}>
            {
              renderSwitch()
            }
            </Suspense>
            </div>
          </div>
        </div>
      </>
    )
  }