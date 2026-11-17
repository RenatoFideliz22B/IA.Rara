import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/praca" className={styles.logo} aria-label="Trocaí, ir para a página inicial">
                    Trocaí
                </Link>

                <nav aria-label="Principal">
                    <Link to="/perfil" className={styles.profileLink} aria-label="Meu perfil">
                        <span className={styles.profileText}>Você</span>
                        <span className={styles.avatar} aria-hidden="true">
                            {/* trocar pelo avatar escolhido pelo aluno depois */}
                        </span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}