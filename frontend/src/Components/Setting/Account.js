import React from "react";
import {useSelector} from 'react-redux'
import {AnimatePresence} from 'framer-motion'
import UserCard from "./UserCard";
import CreateNew from "./CreateNew";
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
//   }
  export default function Account(){    
      const user = useSelector((store)=>store.user)
      
    return <div>
        <center>
            <UserCard user={user}/>
            <AnimatePresence>
                {!user?<CreateNew key={user?.name}/> : <></>}
            </AnimatePresence>
        </center>
    </div>
}