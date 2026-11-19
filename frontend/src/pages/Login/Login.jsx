import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import fiapLogo from '../../assets/images/fiapLogo.png'
import {
    IdentificationCardIcon,
    LockSimpleIcon,
    PaintBrushIcon
} from '@phosphor-icons/react'
import styles from './Login.module.css'
import Button from '../../components/ui/Button/Button'

const DEMO_USER = {
    ra: '123456',
    password: 'senha123'
}

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [tema, setTema] = useState(() => {
        return localStorage.getItem('trocaiTema') === 'fiap'
            ? 'fiap'
            : 'padrao'
    })

    function handleThemeToggle() {
        const novoTema = tema === 'fiap' ? 'padrao' : 'fiap'

        setTema(novoTema)
        localStorage.setItem('trocaiTema', novoTema)

        if (novoTema === 'fiap') {
            document.documentElement.dataset.theme = 'fiap'
        } else {
            delete document.documentElement.dataset.theme
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const ra = formData.get('ra')
        const password = formData.get('password')

        if (!ra || !password) {
            setError('Preencha todos os campos.')
            return
        }

        if (
            ra === DEMO_USER.ra &&
            password === DEMO_USER.password
        ) {
            setError('')
            navigate('/cadastro')
        } else {
            setError('Credenciais inválidas. Verifique seu RA e senha.')
        }
    }

    const logoAtual = tema === 'fiap' ? fiapLogo : logo

    return (
        <section className={styles.container}>
            <div className={styles.loginContainer}>

                <button
                    className={styles.themeButton}
                    type="button"
                    onClick={handleThemeToggle}
                    aria-label={
                        tema === 'fiap'
                            ? 'Voltar para o tema Trocaí'
                            : 'Ativar tema FIAP'
                    }
                    aria-pressed={tema === 'fiap'}
                >
                    <PaintBrushIcon size={18} weight="regular" />
                    {tema === 'fiap' ? 'Usar tema Trocaí' : 'Usar tema FIAP'}
                </button>

                <img
                    src={logoAtual}
                    alt={tema === 'fiap' ? 'Logo FIAP' : 'Logo Trocaí'}
                />

                <h1 className={styles.title}>
                    Login Institucional
                </h1>

                <p className={styles.text}>
                    Acesse com sua conta da instituição (SSO)
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.form}>
                        <label className={styles.formLabel} htmlFor="ra">
                            Credencial / RA
                        </label>

                        <div className={styles.formField}>
                            <IdentificationCardIcon
                                className={styles.formIcon}
                                weight="thin"
                                size={16}
                            />

                            <input
                                className={`${styles.formInput} ${error ? styles.inputError : ''}`}
                                type="text"
                                id="ra"
                                name="ra"
                                required
                                onFocus={() => setError('')}
                            />
                        </div>
                    </div>

                    <div className={styles.form}>
                        <label className={styles.formLabel} htmlFor="password">
                            Senha
                        </label>

                        <div className={styles.formField}>
                            <LockSimpleIcon
                                className={styles.formIcon}
                                weight="thin"
                                size={16}
                            />

                            <input
                                className={`${styles.formInput} ${error ? styles.inputError : ''}`}
                                type="password"
                                id="password"
                                name="password"
                                required
                                onFocus={() => setError('')}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        className={styles.submit}
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </section>
    )
}
