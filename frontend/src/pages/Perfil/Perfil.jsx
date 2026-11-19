import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { LockIcon, PlusIcon, XIcon } from '@phosphor-icons/react'

import Button from '../../components/ui/Button/Button'
import useTema from '../../hooks/useTema'
import styles from './Perfil.module.css'
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

const NOME_COMPLETO = 'Ana Beatriz Souza Almeida'
const CURSO = 'Análise e Desenvolvimento de Sistemas'

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

const avataresPorId = Object.fromEntries(
    [...avataresPadrao, ...avataresFiap].map((avatar) => [avatar.id, avatar.imagem])
)

const tagsPredefinidas = interesses.map((interesse) => ({
    interesse,
    tag: salasPorInteresse[interesse].tag
}))

function obterPerfilSalvo() {
    try {
        return JSON.parse(localStorage.getItem('trocaiPerfil')) || {}
    } catch {
        return {}
    }
}

export default function Perfil() {
    const location = useLocation()
    const tema = useTema()

    const [perfilInicial] = useState(obterPerfilSalvo)

    // Define quais avatares aparecem de acordo com o tema ativo.
    const avatares = tema === 'fiap' ? avataresFiap : avataresPadrao

    // O apelido começa vazio, exceto se já tiver sido salvo anteriormente.
    const [apelido, setApelido] = useState(
        perfilInicial.apelido || ''
    )

    const [sobreMim, setSobreMim] = useState(
        perfilInicial.sobreMim || ''
    )

    // Recupera o avatar escolhido no cadastro.
    const [avatarAtual, setAvatarAtual] = useState(
        perfilInicial.avatar || { tipo: 'padrao', id: avatares[1].id }
    )

    const avatarImagem = avatarAtual.tipo === 'personalizado'
        ? avatarAtual.imagem
        : avataresPorId[avatarAtual.id] || avatares[1].imagem

    // Controle do modal de avatar.
    const [modalAvatarAberto, setModalAvatarAberto] = useState(false)
    const [avatarEmEdicao, setAvatarEmEdicao] = useState(avatarAtual)
    const [erroImagem, setErroImagem] = useState('')

    const botaoAvatarRef = useRef(null)
    const fecharModalRef = useRef(null)
    const inputArquivoRef = useRef(null)

    // Tags personalizadas criadas pelo usuário.
    const [tagsPersonalizadas, setTagsPersonalizadas] = useState(
        perfilInicial.tagsPersonalizadas || []
    )

    // Recupera as tags selecionadas no cadastro e em edições anteriores.
    const [tagsSelecionadas, setTagsSelecionadas] = useState(() => {
        const interessesSalvos = perfilInicial.interesses || []

        const tagsSalvas = interessesSalvos
            .map((interesse) => salasPorInteresse[interesse]?.tag)
            .filter(Boolean)

        const tagsCustomizadasSalvas =
            perfilInicial.tagsSelecionadasPersonalizadas || []

        return [...tagsSalvas, ...tagsCustomizadasSalvas]
    })

    const [novaTagInput, setNovaTagInput] = useState('')
    const [salvo, setSalvo] = useState(false)

    const tags = [
        ...tagsPredefinidas.map((item) => item.tag),
        ...tagsPersonalizadas
    ]

    // Abre o modal usando o avatar atualmente selecionado.
    function abrirModalAvatar() {
        setAvatarEmEdicao(avatarAtual)
        setErroImagem('')
        setModalAvatarAberto(true)
    }

    // Seleciona um dos avatares disponíveis no modal.
    function selecionarAvatar(id) {
        setAvatarEmEdicao({
            tipo: 'padrao',
            id
        })

        setErroImagem('')
    }

    // Faz upload de uma imagem personalizada.
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
            setAvatarEmEdicao({
                tipo: 'personalizado',
                imagem: leitor.result
            })

            setErroImagem('')
        }

        leitor.onerror = () => {
            setErroImagem('Não foi possível carregar a imagem.')
        }

        leitor.readAsDataURL(arquivo)
        event.target.value = ''
    }

    // Confirma a escolha feita no modal.
    function confirmarAvatar() {
        setAvatarAtual(avatarEmEdicao)
        setModalAvatarAberto(false)
        setSalvo(false)
    }

    // Alterna entre selecionar e desselecionar uma tag.
    function alternarTag(tag) {
        setTagsSelecionadas((atuais) =>
            atuais.includes(tag)
                ? atuais.filter((item) => item !== tag)
                : [...atuais, tag]
        )

        setSalvo(false)
    }

    // Adiciona uma nova tag personalizada.
    function adicionarTag() {
        if (!novaTagInput.trim()) return

        let tagFormatada = novaTagInput.trim()

        if (!tagFormatada.startsWith('#')) {
            tagFormatada = `#${tagFormatada}`
        }

        if (!tags.includes(tagFormatada)) {
            setTagsPersonalizadas((atuais) => [
                ...atuais,
                tagFormatada
            ])

            setTagsSelecionadas((atuais) => [
                ...atuais,
                tagFormatada
            ])
        }

        setNovaTagInput('')
        setSalvo(false)
    }

    // Salva todas as alterações no mesmo registro utilizado pelo cadastro.
    function salvarAlteracoes() {
        const interessesSelecionados = tagsPredefinidas
            .filter((item) => tagsSelecionadas.includes(item.tag))
            .map((item) => item.interesse)

        const tagsCustomizadasSelecionadas = tagsSelecionadas.filter(
            (tag) => !tagsPredefinidas.some((item) => item.tag === tag)
        )

        const perfilAtualizado = {
            ...obterPerfilSalvo(),
            nomeCompleto: NOME_COMPLETO,
            avatar: avatarAtual,
            apelido: apelido.trim(),
            sobreMim,
            interesses: interessesSelecionados,
            tagsPersonalizadas,
            tagsSelecionadasPersonalizadas: tagsCustomizadasSelecionadas
        }

        localStorage.setItem(
            'trocaiPerfil',
            JSON.stringify(perfilAtualizado)
        )

        window.dispatchEvent(new Event('trocaiPerfilAtualizado'))

        setSalvo(true)
    }

    // Se a página abrir com #sobre-mim, leva o usuário até a bio.
    useEffect(() => {
        if (location.hash === '#sobre-mim') {
            const campoBio = document.getElementById('sobre-mim')

            if (campoBio) {
                campoBio.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })

                campoBio.focus({ preventScroll: true })
            }
        }
    }, [location.hash])

    // Modal: fecha com Escape, leva o foco ao botão de fechar e devolve o foco ao botão que abriu.
    useEffect(() => {
        if (!modalAvatarAberto) return

        const botao = botaoAvatarRef.current

        function fecharComEsc(event) {
            if (event.key === 'Escape') {
                setModalAvatarAberto(false)
            }
        }

        document.addEventListener('keydown', fecharComEsc)
        fecharModalRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', fecharComEsc)
            botao?.focus()
        }
    }, [modalAvatarAberto])

    return (
        <section className={styles.container}>
            <header className={styles.cabecalho}>
                <h1 className={styles.titulo}>
                    Meu Perfil e Edição de Identidade
                </h1>

                <p className={styles.texto}>
                    É assim que a turma vai te ver na praça.
                </p>
            </header>

            {/* Seção 1: Avatar e Identidade Visual */}
            <section className={styles.card} aria-labelledby="titulo-avatar">
                <h2 id="titulo-avatar" className={styles.cardTitulo}>
                    Avatar e Identidade Visual
                </h2>

                <div className={styles.identidade}>
                    <div className={styles.avatarColuna}>
                        <div className={styles.avatarGrande}>
                            <img
                                src={avatarImagem}
                                alt="Avatar do usuário"
                                className={styles.avatarImagem}
                            />
                        </div>

                        <Button
                            ref={botaoAvatarRef}
                            variant="neutral"
                            size="sm"
                            onClick={abrirModalAvatar}
                        >
                            Alterar avatar
                        </Button>
                    </div>

                    <div className={styles.campos}>
                        <div>
                            <label className={styles.campoRotulo} htmlFor="campo-nome">
                                Nome completo
                            </label>

                            <div className={styles.campoComIcone}>
                                <LockIcon
                                    className={styles.campoIcone}
                                    weight="thin"
                                    size={16}
                                    aria-hidden="true"
                                />

                                <input
                                    id="campo-nome"
                                    type="text"
                                    value={NOME_COMPLETO}
                                    disabled
                                    className={`${styles.input} ${styles.inputBloqueado}`}
                                />

                                <span className={styles.campoSelo}>
                                    via SSO
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className={styles.campoRotulo} htmlFor="campo-curso">
                                Curso
                            </label>

                            <div className={styles.campoComIcone}>
                                <LockIcon
                                    className={styles.campoIcone}
                                    weight="thin"
                                    size={16}
                                    aria-hidden="true"
                                />

                                <input
                                    id="campo-curso"
                                    type="text"
                                    value={CURSO}
                                    disabled
                                    className={`${styles.input} ${styles.inputBloqueado}`}
                                />

                                <span className={styles.campoSelo}>
                                    via SSO
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className={styles.campoRotulo} htmlFor="campo-apelido">
                                Apelido / Como quero ser chamado
                            </label>

                            <input
                                id="campo-apelido"
                                type="text"
                                value={apelido}
                                onChange={(e) => {
                                    setApelido(e.target.value)
                                    setSalvo(false)
                                }}
                                placeholder="Como você gostaria de ser chamado?"
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção 2: Sobre Mim */}
            <section className={styles.card} aria-labelledby="titulo-sobre-mim">
                <div className={styles.cardTopo}>
                    <h2 id="titulo-sobre-mim" className={styles.cardTitulo}>
                        Sobre Mim
                    </h2>

                    <span className={styles.contador}>
                        {sobreMim.length}/140
                    </span>
                </div>

                <textarea
                    id="sobre-mim"
                    maxLength={140}
                    rows={4}
                    aria-labelledby="titulo-sobre-mim"
                    placeholder="Conte um pouco sobre você fora das aulas (hobbies, séries, café ou jogos)..."
                    value={sobreMim}
                    onChange={(e) => {
                        setSobreMim(e.target.value)
                        setSalvo(false)
                    }}
                    className={`${styles.input} ${styles.textarea}`}
                />
            </section>

            {/* Seção 3: Tags de Rotina e Interesses */}
            <section className={styles.card} aria-labelledby="titulo-tags">
                <h2 id="titulo-tags" className={styles.cardTitulo}>
                    Minhas Tags de Rotina e Interesses
                </h2>

                <div className={styles.tags}>
                    {tags.map((tag) => {
                        const selecionada = tagsSelecionadas.includes(tag)

                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => alternarTag(tag)}
                                aria-pressed={selecionada}
                                className={`${styles.tag} ${
                                    selecionada ? styles.tagSelecionada : ''
                                }`}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>

                <div className={styles.novaTag}>
                    <input
                        type="text"
                        aria-label="Criar nova tag"
                        placeholder="Criar nova tag, ex: #CaféETelaPreta"
                        value={novaTagInput}
                        onChange={(e) => setNovaTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                adicionarTag()
                            }
                        }}
                        className={styles.input}
                    />

                    <Button variant="outline" onClick={adicionarTag}>
                        <PlusIcon size={16} weight="bold" aria-hidden="true" />
                        Adicionar
                    </Button>
                </div>
            </section>

            {/* Ações Inferiores */}
            <div className={styles.acoes}>
                <Button to="/praca" variant="neutral">
                    Cancelar
                </Button>

                <Button variant="shadow" onClick={salvarAlteracoes}>
                    Salvar Alterações
                </Button>
            </div>

            {salvo && (
                <p role="status" className={styles.sucesso}>
                    Alterações salvas com sucesso!
                </p>
            )}

            {/* Modal de seleção de avatar */}
            {modalAvatarAberto && (
                <div
                    className={styles.modal}
                    onClick={() => setModalAvatarAberto(false)}
                >
                    <div
                        className={styles.modalJanela}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal-avatar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalTopo}>
                            <div>
                                <h2
                                    id="titulo-modal-avatar"
                                    className={styles.modalTitulo}
                                >
                                    Escolha seu avatar
                                </h2>

                                <p className={styles.modalTexto}>
                                    Selecione uma imagem para representar você.
                                </p>
                            </div>

                            <button
                                ref={fecharModalRef}
                                type="button"
                                className={styles.modalFechar}
                                onClick={() => setModalAvatarAberto(false)}
                                aria-label="Fechar"
                            >
                                <XIcon size={16} aria-hidden="true" />
                            </button>
                        </div>

                        <div className={styles.avatares}>
                            {avatares.map((avatar) => {
                                const selecionado =
                                    avatarEmEdicao.tipo === 'padrao' &&
                                    avatarEmEdicao.id === avatar.id

                                return (
                                    <button
                                        key={avatar.id}
                                        type="button"
                                        onClick={() => selecionarAvatar(avatar.id)}
                                        className={`${styles.avatarOpcao} ${
                                            selecionado
                                                ? styles.avatarOpcaoSelecionada
                                                : ''
                                        }`}
                                        aria-pressed={selecionado}
                                        aria-label={`Selecionar avatar ${avatar.id}`}
                                    >
                                        <img
                                            src={avatar.imagem}
                                            alt=""
                                        />
                                    </button>
                                )
                            })}

                            {avatarEmEdicao.tipo === 'personalizado' && (
                                <div
                                    className={`${styles.avatarOpcao} ${styles.avatarOpcaoSelecionada}`}
                                >
                                    <img
                                        src={avatarEmEdicao.imagem}
                                        alt="Avatar personalizado selecionado"
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.adicionarContainer}>
                            <Button
                                variant="outline"
                                onClick={() => inputArquivoRef.current?.click()}
                            >
                                <PlusIcon size={16} weight="bold" aria-hidden="true" />
                                Adicionar imagem
                            </Button>

                            <input
                                ref={inputArquivoRef}
                                className={styles.inputArquivo}
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={adicionarAvatar}
                            />
                        </div>

                        {erroImagem && (
                            <p className={styles.erro} role="alert">
                                {erroImagem}
                            </p>
                        )}

                        <div className={styles.modalRodape}>
                            <Button
                                variant="neutral"
                                onClick={() => setModalAvatarAberto(false)}
                            >
                                Cancelar
                            </Button>

                            <Button variant="primary" onClick={confirmarAvatar}>
                                Usar avatar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
