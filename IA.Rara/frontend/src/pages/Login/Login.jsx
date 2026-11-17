import { Link } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login() {
    return (
        <section className={styles.container}>
            <h1>Login</h1>

            {/* TEMPORÁRIO: trocar por o envio do formulário */}
            <Link to="/cadastro">Ir para o cadastro</Link>
        </section>
    )
}