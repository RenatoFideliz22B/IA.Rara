
import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Phone, Video, ShieldCheck, Paperclip, Send } from 'lucide-react'

import styles from './Sala.module.css'
import { salasPorInteresse } from '../../data/salas'

export default function Sala() {
    const { id } = useParams()

    const salaEncontrada = Object.values(salasPorInteresse).find(
        sala => sala.id === id
    )

    if (!salaEncontrada) {
        return (
            <main className={styles.container}>
                <div className={styles.roomLayout}>
                    <section className={styles.chatArea}>
                        <h2>Sala não encontrada</h2>

                        <Link to="/praca">
                            Voltar à Praça
                        </Link>
                    </section>
                </div>
            </main>
        )
    }

    return <ConteudoSala key={id} sala={salaEncontrada} />
}

function ConteudoSala({ sala }) {
    const participantes = sala.participantes

    function obterMensagensIniciais() {
        return sala.mensagens.map(mensagem => {
            const participante = participantes.find(
                pessoa => pessoa.nome === mensagem.autor
            )

            return {
                ...mensagem,
                avatar: participante?.avatar || participantes[1]?.avatar
            }
        })
    }

    const [mensagens, setMensagens] = useState(obterMensagensIniciais)
    const [texto, setTexto] = useState('')
    const [audioAtivo, setAudioAtivo] = useState(false)
    const [videoAtivo, setVideoAtivo] = useState(false)
    const [pergunta, setPergunta] = useState(sala.perguntas[0])
    const [arquivo, setArquivo] = useState(null)

    const mensagensRef = useRef(null)
    const arquivoRef = useRef(null)

    const meuAvatar = participantes.find(
        pessoa => pessoa.nome === 'Você'
    )?.avatar

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
            avatar: meuAvatar,
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
        <main className={styles.container} data-room-id={sala.id}>
            <div className={styles.roomLayout}>

                {/* SIDEBAR */}

                <aside className={styles.sidebar}>

                    <Link to="/praca" className={styles.backLink}>
                        <span>←</span>
                        Voltar à Praça
                    </Link>

                    <div className={styles.roomInfo}>
                        <h2>{sala.titulo}</h2>
                        <span>#{sala.id.replaceAll('-', '')}</span>
                    </div>

                    <div className={styles.affinityNotice}>
                        <ShieldCheck size={17} strokeWidth={1.8} />

                        <p>
                            Chat liberado por afinidade
                            <strong>#{sala.id.replaceAll('-', '')}</strong>
                        </p>
                    </div>

                    {/* PARTICIPANTES */}

                    <div className={styles.participantsSection}>
                        <div className={styles.sectionTitle}>
                            PRESENTES AGORA ({participantes.length})
                        </div>

                        <div className={styles.participantsList}>
                            {participantes.map(pessoa => (
                                <div
                                    key={pessoa.id}
                                    className={styles.participant}
                                >
                                    <div className={styles.avatar}>
                                        <img
                                            src={pessoa.avatar}
                                            alt={`Avatar de ${pessoa.nome}`}
                                        />
                                    </div>

                                    <span>{pessoa.nome}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ÁREA PRINCIPAL */}

                <section className={styles.chatArea}>

                    {/* CABEÇALHO */}

                    <header className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <h2>{sala.titulo}</h2>

                            <span>
                                {participantes.length} pessoas na sala
                            </span>
                        </div>

                        <div className={styles.headerActions}>

                            <button
                                type="button"
                                className={`${styles.actionButton} ${
                                    audioAtivo ? styles.activeButton : ''
                                }`}
                                onClick={() => setAudioAtivo(!audioAtivo)}
                            >
                                <Phone size={16} strokeWidth={1.8} />

                                {audioAtivo ? 'Áudio ligado' : 'Áudio'}
                            </button>

                            <button
                                type="button"
                                className={`${styles.videoButton} ${
                                    videoAtivo ? styles.videoActive : ''
                                }`}
                                onClick={() => setVideoAtivo(!videoAtivo)}
                            >
                                <Video size={16} strokeWidth={1.8} />

                                {videoAtivo ? 'Vídeo ligado' : 'Iniciar Vídeo'}
                            </button>

                        </div>
                    </header>

                    {/* PERGUNTA DA SALA */}

                    <div className={styles.promptSection}>
                        <div className={styles.promptInfo}>
                            <span>DECK QUEBRA-GELO ATIVO</span>
                            <p>{pergunta}</p>
                        </div>

                        <button
                            type="button"
                            className={styles.nextButton}
                            onClick={proximaPergunta}
                        >
                            <span>⤨</span>
                            Próxima
                        </button>
                    </div>

                    {/* MENSAGENS */}

                    <div
                        className={styles.messagesArea}
                        ref={mensagensRef}
                    >
                        {mensagens.map(mensagem => (
                            <article
                                key={mensagem.id}
                                className={`${styles.message} ${
                                    mensagem.autor === 'Você'
                                        ? styles.ownMessage
                                        : ''
                                }`}
                            >
                                <div className={`${styles.avatar} ${styles.messageAvatar}`}>
                                    <img
                                        src={mensagem.avatar}
                                        alt={`Avatar de ${mensagem.autor}`}
                                    />
                                </div>

                                <div className={styles.messageContent}>
                                    <span className={styles.messageAuthor}>
                                        {mensagem.autor}
                                    </span>

                                    <div className={styles.messageBubble}>
                                        <p>{mensagem.texto}</p>

                                        <span className={styles.messageTime}>
                                            {mensagem.horario}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CAMPO DE MENSAGEM */}

                    <form
                        className={styles.messageForm}
                        onSubmit={enviarMensagem}
                    >
                        <input
                            type="file"
                            ref={arquivoRef}
                            className={styles.hiddenFile}
                            onChange={e =>
                                setArquivo(e.target.files[0] || null)
                            }
                        />

                        <button
                            type="button"
                            className={styles.attachButton}
                            title="Anexar arquivo"
                            onClick={() => arquivoRef.current?.click()}
                        >
                            <Paperclip size={17} strokeWidth={1.8} />
                        </button>

                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder={
                                    arquivo
                                        ? arquivo.name
                                        : 'Mande sua mensagem ou reaja...'
                                }
                                value={texto}
                                onChange={e => setTexto(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.sendButton}
                            title="Enviar mensagem"
                            aria-label="Enviar mensagem"
                        >
                            <Send size={17} strokeWidth={1.8} />
                        </button>
                    </form>
                </section>
            </div>
        </main>
    )
}
