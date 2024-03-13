import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home, Login, NotFound } from "./pages"
import "rsuite/dist/rsuite.min.css"
import { AppContextProvider, INITIAL_APP_VALUES } from "./contexts"
import { CustomProvider } from "rsuite"

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/*",
            element: <NotFound />,
        },
    ])

    return (
        <CustomProvider theme="light">
            <AppContextProvider {...INITIAL_APP_VALUES}>
                <RouterProvider router={router} />
            </AppContextProvider>
        </CustomProvider>
    )
}

export default App
