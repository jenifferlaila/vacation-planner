import { createContext, useContext, useEffect } from "react"
import { Loader } from "rsuite"

import useAppProvider from "./App.hook"
import { LoadingWrapper } from "./App.style"
import { AppContextData, AppContextProviderProps } from "./App.types"
import { User } from "../../services"
import { texts } from "../../util"

const mockAsyncFunc = () => new Promise<undefined>((resolve) => resolve(undefined))

export const INITIAL_APP_VALUES: AppContextData = {
    isLoggedIn: false,
    onAuth: mockAsyncFunc,
    onLogin: mockAsyncFunc,
    onLoad: () => null,
}

export const AppContext = createContext<AppContextData>(INITIAL_APP_VALUES)

export const useApp = () => useContext(AppContext)

export function AppContextProvider(props: AppContextProviderProps) {
    const { children, ...value } = props

    const { isLoggedIn, loading, user, handleAuth, setLoading, handleLogin } = useAppProvider()

    return (
        <AppContext.Provider
            value={{
                ...value,
                isLoggedIn,
                loading,
                user,
                onAuth: handleAuth,
                onLoad: setLoading,
                onLogin: handleLogin,
            }}
        >
            <LoadingWrapper $visible={loading}>
                <Loader size="md" content={texts["common.loading"]} />
            </LoadingWrapper>
            {children}
        </AppContext.Provider>
    )
}

export function useAuth(callback?: (res?: User) => Promise<void>) {
    const { onAuth } = useApp()

    useEffect(() => {
        const action = async () => {
            const res = await onAuth()

            if (callback) await callback(res)
        }

        action()
    }, [callback])

    return {}
}
