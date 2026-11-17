import { Link } from 'react-router-dom'
import styles from './Cadastro.module.css'

export default function Cadastro() {
    return (
        <section className={styles.container}>
            <h1>Cadastro</h1>

            {/* TEMPORÁRIO: trocar pelo botão "Próximo" do formulário */}
            <Link to="/praca">Ir para a Home</Link>
        </section>
    )
}