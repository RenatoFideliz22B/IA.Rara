import { useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import {
    ArrowLeftIcon,
    PaperclipIcon,
    PaperPlaneRightIcon,
    PhoneIcon,
    ShieldCheckIcon,
    ShuffleIcon,
    VideoCameraIcon
} from '@phosphor-icons/react'

import Button from '../../components/ui/Button/Button'
import useTema from '../../hooks/useTema'
import styles from './Sala.module.css'
import { salasPorInteresse } from '../../data/salas'

export default function Sala() {
    const { id } = useParams()

    const salaEncontrada = Object.values(salasPorInteresse).find(
        sala => sala.id === id
    )

    if (!salaEncontrada) {
        return (
            <section className={styles.container}>
                <div className={styles.naoEncontrada}>
                    <h1 className={styles.salaTitulo}>Sala não encontrada</h1>

                    <p className={styles.naoEncontradaTexto}>
                        Essa sala não existe. Volte para a Praça e escolha uma das suas salas.
                    </p>

                    <Button to="/praca" variant="primary">
                        Voltar à Praça
                    </Button>
                </div>
            </section>
        )
    }

    return <ConteudoSala key={id} sala={salaEncontrada} />
}

function ConteudoSala({ sala }) {
    const tema = useTema()
    const participantes = sala.participantes
    const codigoSala = `#${sala.id.replaceAll('-', '')}`

    const [mensagens, setMensagens] = useState(sala.mensagens)
    const [texto, setTexto] = useState('')
    const [audioAtivo, setAudioAtivo] = useState(false)
    const [videoAtivo, setVideoAtivo] = useState(false)
    const [pergunta, setPergunta] = useState(sala.perguntas[0])
    const [arquivo, setArquivo] = useState(null)

    const mensagensRef = useRef(null)
    const arquivoRef = useRef(null)

    // O avatar acompanha o tema ativo (Trocaí ou FIAP).
    function obterAvatar(pessoa) {
        return tema === 'fiap' ? pessoa.avatarFiap : pessoa.avatar
    }

    function obterParticipante(nome) {
        return participantes.find(pessoa => pessoa.nome === nome) || participantes[1]
    }

    function enviarMensagem(e) {
        e.preventDefault()

        if (!texto.trim() && !arquivo) return

        const agora = new Date()

        const horario = agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })

        const novaMensagem = {
            id: Date.now(),
            autor: 'Você',
            texto: texto.trim() || `📎 Arquivo: ${arquivo.name}`,
            horario
        }

        setMensagens(prev => [...prev, novaMensagem])
        setTexto('')
        setArquivo(null)

        if (arquivoRef.current) {
            arquivoRef.current.value = ''
        }

        setTimeout(() => {
            if (mensagensRef.current) {
                mensagensRef.current.scrollTop =
                    mensagensRef.current.scrollHeight
            }
        }, 50)
    }

    function proximaPergunta() {
        const disponiveis = sala.perguntas.filter(
            item => item !== pergunta
        )

        const proxima = disponiveis[
            Math.floor(Math.random() * disponiveis.length)
        ]

        setPergunta(proxima)
    }

    return (
        <section className={styles.container} data-room-id={sala.id}>
            <div className={styles.layout}>

                {/* LATERAL */}

                <aside className={styles.lateral}>
                    <Button
                        to="/praca"
                        variant="neutral"
                        size="sm"
                        className={styles.voltar}
                    >
                        <ArrowLeftIcon size={16} aria-hidden="true" />
                        Voltar à Praça
                    </Button>

                    <div className={styles.salaInfo}>
                        <h1 className={styles.salaTitulo}>{sala.titulo}</h1>
                        <span className={styles.salaCodigo}>{codigoSala}</span>
                    </div>

                    <div className={styles.aviso}>
                        <ShieldCheckIcon
                            className={styles.avisoIcone}
                            size={18}
                            aria-hidden="true"
                        />

                        <p className={styles.avisoTexto}>
                            Chat liberado por afinidade
                            <strong className={styles.avisoCodigo}>
                                {codigoSala}
                            </strong>
                        </p>
                    </div>

                    {/* PARTICIPANTES */}

                    <h2 className={styles.rotulo}>
                        Presentes agora ({participantes.length})
                    </h2>

                    <ul className={styles.participantesLista}>
                        {participantes.map(pessoa => (
                            <li
                                key={pessoa.id}
                                className={styles.participanteItem}
                            >
                                <span className={styles.avatar}>
                                    <img src={obterAvatar(pessoa)} alt="" />
                                </span>

                                {pessoa.nome}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ÁREA PRINCIPAL */}

                <section className={styles.conversa}>

                    {/* CABEÇALHO */}

                    <header className={styles.conversaTopo}>
                        <div>
                            <p className={styles.conversaTitulo}>
                                {sala.titulo}
                            </p>

                            <span className={styles.conversaDetalhe}>
                                {participantes.length} pessoas na sala
                            </span>
                        </div>

                        <div className={styles.conversaAcoes}>
                            <Button
                                variant={audioAtivo ? 'outline' : 'neutral'}
                                size="sm"
                                onClick={() => setAudioAtivo(!audioAtivo)}
                            >
                                <PhoneIcon size={16} aria-hidden="true" />
                                {audioAtivo ? 'Áudio ligado' : 'Áudio'}
                            </Button>

                            <Button
                                variant={videoAtivo ? 'outline' : 'primary'}
                                size="sm"
                                onClick={() => setVideoAtivo(!videoAtivo)}
                            >
                                <VideoCameraIcon size={16} aria-hidden="true" />
                                {videoAtivo ? 'Vídeo ligado' : 'Iniciar Vídeo'}
                            </Button>
                        </div>
                    </header>

                    {/* PERGUNTA DA SALA */}

                    <div className={styles.quebraGelo}>
                        <div className={styles.quebraGeloInfo}>
                            <span className={styles.rotulo}>
                                Deck quebra-gelo ativo
                            </span>

                            <p className={styles.quebraGeloTexto}>{pergunta}</p>
                        </div>

                        <Button
                            variant="neutral"
                            size="sm"
                            className={styles.quebraGeloBotao}
                            onClick={proximaPergunta}
                            aria-label="Mostrar próxima pergunta quebra-gelo"
                        >
                            <ShuffleIcon size={16} aria-hidden="true" />
                            Próxima
                        </Button>
                    </div>

                    {/* MENSAGENS */}

                    <div
                        className={styles.mensagens}
                        ref={mensagensRef}
                        role="log"
                        aria-label="Mensagens da sala"
                        tabIndex={0}
                    >
                        {mensagens.map(mensagem => (
                            <article
                                key={mensagem.id}
                                className={`${styles.mensagem} ${
                                    mensagem.autor === 'Você'
                                        ? styles.mensagemPropria
                                        : ''
                                }`}
                            >
                                <span className={`${styles.avatar} ${styles.mensagemAvatar}`}>
                                    <img
                                        src={obterAvatar(obterParticipante(mensagem.autor))}
                                        alt=""
                                    />
                                </span>

                                <div className={styles.mensagemConteudo}>
                                    <span className={styles.mensagemAutor}>
                                        {mensagem.autor}
                                    </span>

                                    <div className={styles.mensagemBalao}>
                                        <p className={styles.mensagemTexto}>
                                            {mensagem.texto}
                                        </p>

                                        <span className={styles.mensagemHorario}>
                                            {mensagem.horario}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CAMPO DE MENSAGEM */}

                    <form
                        className={styles.formMensagem}
                        onSubmit={enviarMensagem}
                    >
                        <input
                            type="file"
                            ref={arquivoRef}
                            className={styles.inputArquivo}
                            onChange={e =>
                                setArquivo(e.target.files[0] || null)
                            }
                        />

                        <Button
                            variant="neutral"
                            className={styles.botaoIcone}
                            title="Anexar arquivo"
                            aria-label="Anexar arquivo"
                            onClick={() => arquivoRef.current?.click()}
                        >
                            <PaperclipIcon size={18} aria-hidden="true" />
                        </Button>

                        <input
                            type="text"
                            className={styles.campoMensagem}
                            aria-label="Mensagem"
                            placeholder={
                                arquivo
                                    ? arquivo.name
                                    : 'Mande sua mensagem ou reaja...'
                            }
                            value={texto}
                            onChange={e => setTexto(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className={styles.botaoIcone}
                            title="Enviar mensagem"
                            aria-label="Enviar mensagem"
                        >
                            <PaperPlaneRightIcon size={18} aria-hidden="true" />
                        </Button>
                    </form>
                </section>
            </div>
        </section>
    )
}
