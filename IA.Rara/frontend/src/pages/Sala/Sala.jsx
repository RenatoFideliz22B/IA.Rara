import { Link, useParams } from 'react-router-dom'
import styles from './Sala.module.css'

export default function Sala() {
    const { id } = useParams()

    return (
        <section className={styles.container}>
            <h1>Sala: {id}</h1>

            {/* TEMPORÁRIO: trocar pelo link "Voltar à Praça" do design */}
            <Link to="/praca">Voltar à Home</Link>
        </section>
    )
}