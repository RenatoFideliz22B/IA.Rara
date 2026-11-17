import { Link } from 'react-router-dom'
import styles from './Perfil.module.css'

export default function Perfil() {
    return (
        <section className={styles.container}>
            <h1>Perfil</h1>

            {/* TEMPORÁRIO: trocar pelos botões "Salvar" e "Cancelar" */}
            <Link to="/praca">Voltar para a Home</Link>
        </section>
    )
}