import React, {useContext, useState, useEffect} from  'react'
import { useHistory } from 'react-router-dom'
import {auth} from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

//metodo para administrar los datos del usuario
export const AuthProvider = ({ children }) =>{
    //creamos los estados
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState(null) //objeto bacio
    const history = useHistory()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUsuario(user)
            setLoading(false)
            //usuario?history.push('/chats'):history.push('/')
            if (usuario){
                history.push('/chats')
            }
        })
    },[usuario, history])//vacio cualquier cambio, parametros cuando tengan cambien se activa 
    
    const value = { usuario }

    return (
        <AuthContext.Provider value={value}>
            {/* mostrar componentes si no estan cargados */}
            {!loading && children}
        </AuthContext.Provider>

    )
}

