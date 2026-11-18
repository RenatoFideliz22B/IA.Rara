import { useState } from 'react'
import { Link } from 'react-router-dom'

import logoTrocaí from '../../assets/images/logoBranca.png'
import logoFiap from '../../assets/images/fiapLogo.png'


import avatarUm from '../../assets/avatars/1.png'
import avatarDois from '../../assets/avatars/2.png'
import avatarTres from '../../assets/avatars/3.png'
import avatarQuatro from '../../assets/avatars/4.png'
import avatarCinco from '../../assets/avatars/5.png'
import avatarSeis from '../../assets/avatars/6.png'
import avatarSete from '../../assets/avatars/7.png'
import avatarOito from '../../assets/avatars/8.png'

import avatarNove from '../../assets/avatars/9.png'
import avatarDez from '../../assets/avatars/10.png'
import avatarOnze from '../../assets/avatars/11.png'
import avatarDoze from '../../assets/avatars/12.png'
import avatarTreze from '../../assets/avatars/13.png'
import avatarQuatorze from '../../assets/avatars/14.png'
import avatarQuinze from '../../assets/avatars/15.png'
import avatarDezesseis from '../../assets/avatars/16.png'

import styles from './Header.module.css'

const avatares = {
    1: avatarUm,
    2: avatarDois,
    3: avatarTres,
    4: avatarQuatro,
    5: avatarCinco,
    6: avatarSeis,
    7: avatarSete,
    8: avatarOito,
    9: avatarNove,
    10: avatarDez,
    11: avatarOnze,
    12: avatarDoze,
    13: avatarTreze,
    14: avatarQuatorze,
    15: avatarQuinze,
    16: avatarDezesseis
}

export default function Header() {
    const [perfil] = useState(() => {
        const dadosSalvos = localStorage.getItem('trocaiPerfil')

        return dadosSalvos ? JSON.parse(dadosSalvos) : null
    })

    const tema = localStorage.getItem('trocaiTema')
    const logoAtual = tema === 'fiap' ? logoFiap : logoTrocaí

    const avatar = perfil?.avatar?.tipo === 'personalizado'
        ? perfil.avatar.imagem
        : avatares[perfil?.avatar?.id]

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link
                    to="/praca"
                    className={styles.logo}
                    aria-label="Trocaí, ir para a página inicial"
                >
                    <img
                        src={logoAtual}
                        alt={tema === 'fiap' ? 'FIAP' : 'Trocaí'}
                    />
                </Link>

                <nav aria-label="Principal">
                    <Link
                        to="/perfil"
                        className={styles.profileLink}
                        aria-label="Meu perfil"
                    >
                        <span className={styles.profileText}>Você</span>

                        <span className={styles.avatar}>
                            {avatar && (
                                <img
                                    src={avatar}
                                    alt=""
                                />
                            )}
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
