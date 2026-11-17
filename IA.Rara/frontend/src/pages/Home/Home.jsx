import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
    return (
        <section className={styles.container}>
            <h1>Home</h1>

            {/* TEMPORÁRIO: trocar pelo botão "Entrar" de cada sala */}
            <Link to="/sala/cafe-e-code">Entrar na sala Café e Code</Link>
        </section>
    )
}