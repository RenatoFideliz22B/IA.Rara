import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Cadastro.module.css'
import Button from '../../components/ui/Button/Button'
import AssistantWidget from '../../components/AssistantWidget/AssistantWidget'

import { interesses, salasPorInteresse } from '../../data/salas'

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

const avataresPadrao = [
    { id: 1, imagem: avatarUm },
    { id: 2, imagem: avatarDois },
    { id: 3, imagem: avatarTres },
    { id: 4, imagem: avatarQuatro },
    { id: 5, imagem: avatarCinco },
    { id: 6, imagem: avatarSeis },
    { id: 7, imagem: avatarSete },
    { id: 8, imagem: avatarOito }
]

const avataresFiap = [
    { id: 9, imagem: avatarNove },
    { id: 10, imagem: avatarDez },
    { id: 11, imagem: avatarOnze },
    { id: 12, imagem: avatarDoze },
    { id: 13, imagem: avatarTreze },
    { id: 14, imagem: avatarQuatorze },
    { id: 15, imagem: avatarQuinze },
    { id: 16, imagem: avatarDezesseis }
]

export default function Cadastro() {
    const navigate = useNavigate()

    const [avatarSelecionado, setAvatarSelecionado] = useState(null)
    const [imagemPersonalizada, setImagemPersonalizada] = useState(null)
    const [interessesSelecionados, setInteressesSelecionados] = useState([])

    const [erroAvatar, setErroAvatar] = useState('')
    const [erroImagem, setErroImagem] = useState('')
    const [erroInteresses, setErroInteresses] = useState('')

    const tema = localStorage.getItem('trocaiTema')
    const avatares = tema === 'fiap' ? avataresFiap : avataresPadrao

    function selecionarInteresse(interesse) {
        setErroInteresses('')

        setInteressesSelecionados((atuais) =>
            atuais.includes(interesse)
                ? atuais.filter((item) => item !== interesse)
                : [...atuais, interesse]
        )
    }

    function adicionarAvatar(event) {
        const arquivo = event.target.files[0]

        if (!arquivo) return

        const formatosPermitidos = [
            'image/png',
            'image/jpeg',
            'image/webp'
        ]

        if (!formatosPermitidos.includes(arquivo.type)) {
            setErroImagem('Selecione uma imagem PNG, JPG ou WebP.')
            event.target.value = ''
            return
        }

        if (arquivo.size > 1024 * 1024) {
            setErroImagem('A imagem deve ter no máximo 1 MB.')
            event.target.value = ''
            return
        }

        const leitor = new FileReader()

        leitor.onload = () => {
            setImagemPersonalizada(leitor.result)
            setAvatarSelecionado(null)
            setErroImagem('')
            setErroAvatar('')
        }

        leitor.onerror = () => {
            setErroImagem('Não foi possível carregar a imagem.')
        }

        leitor.readAsDataURL(arquivo)
        event.target.value = ''
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (!avatarSelecionado && !imagemPersonalizada) {
            setErroAvatar('Escolha um avatar para continuar.')
            return
        }

        if (interessesSelecionados.length === 0) {
            setErroInteresses('Selecione pelo menos um interesse.')
            return
        }

        setErroAvatar('')
        setErroInteresses('')

        const perfil = {
            avatar: avatarSelecionado
                ? {
                    tipo: 'padrao',
                    id: avatarSelecionado
                }
                : {
                    tipo: 'personalizado',
                    imagem: imagemPersonalizada
                },
            interesses: interessesSelecionados
        }

        localStorage.setItem('trocaiPerfil', JSON.stringify(perfil))

        navigate('/praca')
    }

    return (
        <section className={styles.container}>
            <form
                className={styles.cadastroContainer}
                onSubmit={handleSubmit}
            >
                <div className={styles.cadastroTopo}>
                    <p className={styles.textTopo}>Cadastro rápido</p>
                    <p className={styles.textTopo}>1 passo</p>
                </div>

                <div className={styles.barra}></div>

                <h1 className={styles.titulo}>
                    Monte sua identidade na turma
                </h1>

                <fieldset className={styles.grupo}>
                    <legend className={styles.subtitulo}>
                        Escolha seu avatar
                    </legend>

                    <div className={styles.avatares}>
                        {avatares.map((avatar) => (
                            <label
                                key={avatar.id}
                                className={`${styles.avatarOpcao} ${
                                    avatarSelecionado === avatar.id
                                        ? styles.avatarOpcaoSelecionada
                                        : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="avatar"
                                    value={avatar.id}
                                    checked={avatarSelecionado === avatar.id}
                                    onChange={() => {
                                        setAvatarSelecionado(avatar.id)
                                        setErroAvatar('')
                                    }}
                                />

                                <img
                                    src={avatar.imagem}
                                    alt={`Avatar ${avatar.id}`}
                                />
                            </label>
                        ))}

                        {imagemPersonalizada && (
                            <label
                                className={`${styles.avatarOpcao} ${
                                    !avatarSelecionado
                                        ? styles.avatarOpcaoSelecionada
                                        : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="avatar"
                                    checked={!avatarSelecionado && !!imagemPersonalizada}
                                    onChange={() => {
                                        setAvatarSelecionado(null)
                                        setErroAvatar('')
                                    }}
                                />

                                <img
                                    src={imagemPersonalizada}
                                    alt="Avatar personalizado"
                                />
                            </label>
                        )}
                    </div>

                    <div className={styles.adicionarContainer}>
                        <Button
                            as="label"
                            htmlFor="input-avatar"
                            variant="outline"
                        >
                            + Adicionar
                        </Button>

                        <input
                            id="input-avatar"
                            className={styles.inputArquivo}
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={adicionarAvatar}
                        />
                    </div>

                    {erroAvatar && (
                        <p className={styles.erro} role="alert">
                            {erroAvatar}
                        </p>
                    )}

                    {erroImagem && (
                        <p className={styles.erro} role="alert">
                            {erroImagem}
                        </p>
                    )}
                </fieldset>

                <fieldset className={styles.grupo}>
                    <legend className={styles.subtitulo}>
                        Rotina e interesses
                    </legend>

                    <div className={styles.tags}>
                        {interesses.map((interesse) => (
                            <button
                                key={interesse}
                                type="button"
                                className={`${styles.tag} ${
                                    interessesSelecionados.includes(interesse)
                                        ? styles.tagSelecionada
                                        : ''
                                }`}
                                aria-pressed={interessesSelecionados.includes(interesse)}
                                onClick={() => selecionarInteresse(interesse)}
                            >
                                {salasPorInteresse[interesse].tag}
                            </button>
                        ))}
                    </div>

                    {erroInteresses && (
                        <p className={styles.erro} role="alert">
                            {erroInteresses}
                        </p>
                    )}
                </fieldset>

                <div className={styles.acoes}>
                    <Button type="submit" variant="primary">
                        Próximo
                    </Button>
                </div>
            </form>

            <AssistantWidget dica="Escolha um avatar e algumas tags da sua rotina. Dá para mudar depois!" />
        </section>
    )
}
