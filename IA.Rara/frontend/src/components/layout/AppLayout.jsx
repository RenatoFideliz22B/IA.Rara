// AppLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import AssistantWidget from '../AssistantWidget/AssistantWidget'

export default function AppLayout() {
    return (
        <>
            <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
            <Header />
            <main id="conteudo">
                <Outlet />
            </main>
            <AssistantWidget />
        </>
    )
}