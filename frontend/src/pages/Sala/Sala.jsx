import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Phone, Video, ShieldCheck, Paperclip, Send } from 'lucide-react'

import styles from './Sala.module.css'

// ICONES PARTICIPANTES
import umImg from '../../assets/avatars/1.png'
import doisImg from '../../assets/avatars/2.png'
import tresImg from '../../assets/avatars/3.png'
import quatroImg from '../../assets/avatars/4.png'
import cincoImg from '../../assets/avatars/5.png'
import seisImg from '../../assets/avatars/6.png'
import seteImg from '../../assets/avatars/7.png'
import oitoImg from '../../assets/avatars/8.png'

// PARTICIPANTES DA SALA
const participantes = [
    { id: 1, nome: 'Você', avatar: umImg, online: true },
    { id: 2, nome: 'Marina', avatar: doisImg, online: true },
    { id: 3, nome: 'Rafael', avatar: tresImg, online: true },
    { id: 4, nome: 'Júlia', avatar: quatroImg, online: true },
    { id: 5, nome: 'Tiago', avatar: cincoImg, online: true },
    { id: 6, nome: 'Caio', avatar: seisImg, online: true },
    { id: 7, nome: 'Ronaldo', avatar: seteImg, online: true },
    { id: 8, nome: 'Pedro', avatar: oitoImg, online: true }
]

// MENSAGENS PRE SETADAS
const mensagensIniciais = [
    {
        id: 1,
        autor: 'Marina',
        avatar: doisImg,
        texto: 'Terceiro café do dia e ainda é manhã. Alguém mais?',
        horario: '10:02'
    },
    {
        id: 2,
        autor: 'Rafael',
        avatar: tresImg,
        texto: 'Eu já perdi a conta. Mas acabei de achar um grão torrado clarinho que é muito bom.',
        horario: '10:04'
    },
    {
        id: 3,
        autor: 'Júlia',
        avatar: quatroImg,
        texto: 'Me passa o nome! Estou testando um jogo indie de cozinhar, combina com café.',
        horario: '10:06'
    },
    {
        id: 4,
        autor: 'Tiago',
        avatar: cincoImg,
        texto: 'Haha, qual jogo? Eu estou viciado em um de montar cidadezinhas.',
        horario: '10:07'
    }
]

// PERGUNTAS QUEBRA GELO
const perguntas = [
    'Qual jogo, hobby ou atividade aleatória prende sua atenção?',
    'Qual foi a última coisa que fez você rir bastante?',
    'Se pudesse aprender uma habilidade instantaneamente, qual seria?',
    'Qual música você não consegue parar de ouvir?',
    'Qual lugar você gostaria de conhecer?',
    'Qual jogo você recomendaria para todo mundo experimentar?'
]

export default function Sala() {

    const { id } = useParams()
    const [mensagens, setMensagens] = useState(mensagensIniciais)
    const [texto, setTexto] = useState('')
    const [audioAtivo, setAudioAtivo] = useState(false)
    const [videoAtivo, setVideoAtivo] = useState(false)
    const [pergunta, setPergunta] = useState(perguntas[0])
    const [arquivo, setArquivo] = useState(null)
    const mensagensRef = useRef(null)
    const arquivoRef = useRef(null)
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
            avatar: umImg,
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

        const disponiveis = perguntas.filter(
            item => item !== pergunta
        )

        const proxima = disponiveis[
            Math.floor(Math.random() * disponiveis.length)
        ]

        setPergunta(proxima)
    }

    return (
        <main className={styles.container} data-room-id={id}>
            <div className={styles.roomLayout}>
                {/* SIDEBAR */}

                <aside className={styles.sidebar}>

                    <Link to="/praca" className={styles.backLink}>
                        <span>←</span>
                        Voltar à Praça
                    </Link>

                    <div className={styles.roomInfo}>
                        <h2>Clube do Café e Código</h2>
                        <span>#cafe-e-code</span>
                    </div>

                    <div className={styles.affinityNotice}>
                        <ShieldCheck size={17} strokeWidth={1.8} />

                        <p>
                            Chat liberado por afinidade
                            <strong>#CafeCode</strong>
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
                            <h2>Clube do Café e Código</h2>
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
