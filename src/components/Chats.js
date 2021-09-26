import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import { useAuth } from '../context/authContext'
import axios from 'axios'



const Chats = () =>{
    const didmountRef = useRef(false)
    const history = useHistory()
    const {usuario} = useAuth() //accedemos al contexto para optener el usuario
    const [loading, setLoading] = useState(true)

    const handleLogout = async () => {
        await auth.signOut()
        history.push('/')
    }

    //manejar las imagenes
    const getFile = async (url) => {
        const res = await fetch(url)
        const data = await res.blob() //blob eson archivos o imagenes transformados en formato binario

        return new File([data], "userPhoto.jpg", {type:'image/jpeg'})
    }

    useEffect(()=>{
        if(!usuario || usuario === null){
            history.push('/')
            return
        }

        //verificaremos si el usuario existe
        axios.get('https://api.chatengine.io/users/me/',
        { headers:{
                "proyect-id": "ec7c6721-b058-4880-b03b-474a7a8138bd",
                "user-name": usuario.email,
                "user-secret": usuario.uid,
            }
        })//si existe entonces lo mostraremos
        .then(()=>
            setLoading(false)
        )//si no existe lo creamos
        .catch(()=>{
            let formdata = new FormData()
            formdata.append('email', usuario.email)
            formdata.append('username', usuario.email)
            formdata.append('secret', usuario.uid)

            //obtenemos la imagen y la mandamos
            getFile(usuario.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name)
                    //se crea el usuario
                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: { "private-key": 'c7929c17-22a9-4d68-bbb3-b82232738eab' }})
                    .then(()=> setLoading(false))
                    .catch(e=>console.log('e', e.response))
                })
        })
    },[usuario, history])

    if(!usuario) return 'Cargando....'

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ChatApp
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Salir
                </div>

                
            </div>

            {/* se usara una api para hacer los chats */}
            <ChatEngine 
                   height='calc(100vw - 66px)'
                   projectID='ec7c6721-b058-4880-b03b-474a7a8138bd'
                   userName={usuario.email}
                   userSecret={usuario.uid}
                   />
            

        </div>
    )
}

export default Chats