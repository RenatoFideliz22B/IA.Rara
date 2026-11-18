import { useEffect, useState } from 'react'

function lerTema() {
    if (document.documentElement.dataset.theme === 'fiap') return 'fiap'

    try {
        return localStorage.getItem('trocaiTema') === 'fiap' ? 'fiap' : 'padrao'
    } catch {
        return 'padrao'
    }
}

export default function useTema() {
    const [tema, setTema] = useState(lerTema)

    useEffect(() => {
        const observador = new MutationObserver(() => setTema(lerTema()))

        observador.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        return () => observador.disconnect()
    }, [])

    return tema
}
