import { useEffect, useRef } from 'react'
import { googleApi } from '../api/user'
import { toast } from 'react-toastify'
import config from '../config'
import { userDetailAction } from '../Redux/action'
import { useDispatch } from 'react-redux'
  const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = () => {

  const googleButton = useRef(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "124195973979-ge3tr3l0a4tptgfvqfpa49sl5eg8oja2.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        // console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  },[])
  const {TOAST_UI,SET_COOKIEE} = config
  function handleCredentialResponse(response) {
    googleApi(response)
    .then((res)=>{
        toast.success(res.data?.message,TOAST_UI)
        const {token,user} = res.data.data;
        SET_COOKIEE('auth-token',token,15)
        dispatch(userDetailAction(user))
    })
    .catch((res)=>{
        toast.error(res.data?.error,TOAST_UI)
    })
  }

  return (<>
  <div ref={googleButton}></div>
  </>
  )
}

export default GoogleAuth