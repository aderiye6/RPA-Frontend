/*global chrome*/
import '../fake-db'
import React from 'react'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { ReactFlowProvider } from 'react-flow-renderer'








const App = () => {
    console.log(chrome, 'alem')
    const all_pages = useRoutes(AllPages())
    console.log('nafdaline')

   

    return (
        <ReactFlowProvider>
            <SettingsProvider>
                <MatxTheme>
                    <AuthProvider>{all_pages}</AuthProvider>
                </MatxTheme>
            </SettingsProvider>
        </ReactFlowProvider>
    )
}

export default App
