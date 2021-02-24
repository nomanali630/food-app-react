import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { response } from 'express'
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
    const [data, setdata] = useState({
        user: null,
        loginStatus: false,
        token: null
    })
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/profile`,
        }).then((response) => {
            console.log("context res:", response.data.userData)
            if (response.data.status === 200) {
                setdata((prev) => ({
                    ...prev,
                    user: response.data.userData,
                    loginStatus: true
                }))
            }
        }).catch((error) => {
            console.log(error)
            if (error) {
                setdata((prev) => ({ ...prev, loginStatus: false }));
            }
        })
        return ()=>{
            console.log("clean")
        };

    },[]);

    return(
        <GlobalStateContext.Provider value = {data}>
            <GlobalStateUpdateContext.Provider value = {setdata}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
}