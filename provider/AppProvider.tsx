'use client'
import React, { createContext, useContext, useState } from 'react'

interface AppContextProps {
  hasTicket: boolean
  setHasTicket: React.Dispatch<React.SetStateAction<boolean>>
  login: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  showSplash: boolean
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>
  isForget: boolean
  setIsForget: React.Dispatch<React.SetStateAction<boolean>>
  isRestForm: boolean
  setIsRestForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<AppContextProps | null>(null)

export const AppProvider = ({ children }) => {
  const [hasTicket, setHasTicket] = useState(false)
  const [login, setLogin] = useState<boolean>(false)
  const [showSplash, setShowSplash] = useState(true)
  const [isForget, setIsForget] = useState<boolean>(false)
  const [isRestForm, setIsRestForm] = useState<boolean>(false)

  return (
    <Context.Provider
      value={{
        hasTicket,
        setHasTicket,
        login,
        setLogin,
        showSplash,
        setShowSplash,
        isForget,
        setIsForget,
        isRestForm,
        setIsRestForm,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAppProvider = () => useContext(Context)
