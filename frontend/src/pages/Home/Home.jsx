import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const progresso = 78

const marcos = [
    { valor: 30, rotulo: '30%' },
    { valor: 60, rotulo: '60%' },
    { valor: 100, rotulo: '100%' },
]

const acoes = [
    { id: 'check-in', titulo: 'Fazer Check-in Diário', pontos: 10 },
    { id: 'silencio', titulo: 'Ativar Modo Estudo Silencioso por 15 min', pontos: 15 },
    { id: 'encontro', titulo: 'Participar de um Encontro Guiado', pontos: 25 },
]

const salas = [
    { id: 'cafe-e-code', nome: 'cafe-e-code', detalhe: 'CaféECode', online: 6 },
    { id: 'estudo-madrugada', nome: 'estudo-madrugada', detalhe: 'EstudoDeMadrugada', online: 4 },
    { id: 'trabalho-e-estudo', nome: 'trabalho-e-estudo', detalhe: 'TrabalhoEEstudo', online: 9 },
]

const perguntas = [
    'Qual projeto ou hobby fora da faculdade te ajuda a desligar a mente?',
    'Qual foi a melhor dica de estudo que você já recebeu?',
    'Que horário do dia rende mais para você estudar?',
]

function IconeCheck() {
    return (
        <svg className={styles['container__progress_bar-icon']} viewBox="0 0 16 16" aria-hidden="true">
            <path
                d="M2.8 8.5 6.1 11.8 13.2 4.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function IconeCadeado({ classe }) {
    return (
        <svg className={classe || styles['container__progress_bar-icon']} viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3.3" y="7.2" width="9.4" height="6.3" rx="1.3" fill="currentColor" />
            <path
                d="M5.4 7.2V5.3a2.6 2.6 0 0 1 5.2 0V7.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    )
}

function IconePresente() {
    return (
        <svg className={styles['container__progress_prize-icon']} viewBox="0 0 16 16" aria-hidden="true">
            <rect x="1.8" y="6.4" width="12.4" height="7.6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M1.8 9.2h12.4M8 6.4v7.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path
                d="M8 6.4c-.2-2.3-1.4-3.7-2.7-3.7-1.1 0-1.7.9-1.4 1.7.4 1.3 2.3 2 4.1 2zM8 6.4c.2-2.3 1.4-3.7 2.7-3.7 1.1 0 1.7.9 1.4 1.7-.4 1.3-2.3 2-4.1 2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function IconeEntrar() {
    return (
        <svg className={styles['container__salas_entrar-icone']} viewBox="0 0 16 16" aria-hidden="true">
            <path
                d="M2.6 3.1h9.2a1.5 1.5 0 0 1 1.5 1.5v4.3a1.5 1.5 0 0 1-1.5 1.5H6.7L4.3 13v-2.6H2.6a1.5 1.5 0 0 1-1.5-1.5V4.6a1.5 1.5 0 0 1 1.5-1.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function IconeCalendario() {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true">
            <rect x="2.2" y="3.2" width="11.6" height="10.4" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.2 6.4h11.6M5.2 1.8v2.6M10.8 1.8v2.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    )
}

function BotaoEntrar({ sala }) {
    const conteudo = (
        <>
            <IconeEntrar />
            Entrar
        </>
    )

    if (sala.id === 'cafe-e-code') {
        return (
            <Link
                to="/sala/cafe-e-code"
                className={styles['container__salas_entrar']}
                aria-label="Entrar na sala cafe-e-code"
            >
                {conteudo}
            </Link>
        )
    }

    return (
        <button type="button" className={styles['container__salas_entrar']}>
            {conteudo}
        </button>
    )
}

function Salas() {
    return (
        <section className={styles['container__salas']} aria-labelledby="titulo-salas">
            <h2 id="titulo-salas" className={styles['container__salas_titulo']}>Salas & Encontros Rápidos</h2>
            <p className={styles['container__salas_texto']}>
                Converse com quem tem a ver com você ou participe de uma dinâmica guiada.
            </p>

            <p className={styles['container__salas_rotulo']}>Salas de bate-papo ativas por afinidade</p>
            <ul className={styles['container__salas_lista']}>
                {salas.map((sala) => (
                    <li key={sala.id} className={styles['container__salas_item']}>
                        <span className={styles['container__salas_icone']} aria-hidden="true">#</span>
                        <span className={styles['container__salas_info']}>
                            <span className={styles['container__salas_nome']}>{sala.nome}</span>
                            <span className={styles['container__salas_detalhe']}>{sala.detalhe} · {sala.online} online</span>
                        </span>
                        <BotaoEntrar sala={sala} />
                    </li>
                ))}
            </ul>

            <div className={styles['container__salas_painel']}>
                <div className={styles['container__salas_encontro']}>
                    <span className={styles['container__salas_encontro-icone']} aria-hidden="true">
                        <IconeCalendario />
                    </span>
                    <span className={styles['container__salas_encontro-textos']}>
                        <span className={styles['container__salas_encontro-kicker']}>Próximo encontro guiado anti-timidez</span>
                        <span className={styles['container__salas_encontro-titulo']}>Quinta, 20h · grupos de 4 por afinidade</span>
                    </span>
                    <button type="button" className={styles['container__salas_participar']}>Quero participar</button>
                </div>

                <p className={styles['container__salas_perguntas-rotulo']}>Prévia das perguntas quebra-gelo</p>
                <ul className={styles['container__salas_perguntas']}>
                    {perguntas.map((pergunta) => (
                        <li key={pergunta} className={styles['container__salas_pergunta']}>{pergunta}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function ModalMeta({ aberto, onFechar, fecharRef, acao, onAcao }) {
    if (!aberto) return null

    return (
        <div className={styles.modal} onClick={onFechar}>
            <div
                className={styles.modal__janela}
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-meta"
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.modal__topo}>
                    <h2 id="titulo-meta" className={styles.modal__titulo}>Meta Coletiva & Ações Individuais</h2>
                    <button
                        ref={fecharRef}
                        type="button"
                        className={styles.modal__fechar}
                        aria-label="Fechar"
                        onClick={onFechar}
                    >
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 4l8 8M12 4 4 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <p className={styles.modal__secao}>Coletivo - Status da turma</p>
                <div className={styles.modal__status}>
                    <div className={styles.modal__status_item}>
                        <p className={styles.modal__status_rotulo}>Progresso geral</p>
                        <p className={styles.modal__status_valor}>{progresso}%</p>
                    </div>
                    <div className={styles.modal__status_item}>
                        <p className={styles.modal__status_rotulo}>Dias restantes</p>
                        <p className={styles.modal__status_valor}>2 dias</p>
                    </div>
                </div>
                <div
                    className={styles.modal__barra}
                    role="progressbar"
                    aria-valuenow={progresso}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso geral da turma"
                >
                    <div className={styles.modal__barra_progresso} style={{ width: `${progresso}%` }} />
                </div>

                <div className={styles.modal__premio}>
                    <IconeCadeado classe={styles.modal__premio_icone} />
                    <div>
                        <p className={styles.modal__premio_kicker}>Prêmio ao atingir 100%</p>
                        <p className={styles.modal__premio_titulo}>Material de Apoio: Mapa Mental Fase 3</p>
                        <p className={styles.modal__premio_texto}>Templates e resumos liberados para toda a turma.</p>
                    </div>
                </div>

                <div className={styles.modal__privado}>
                    <p id="titulo-contribuicao" className={styles.modal__secao}>Privativo - Minha contribuição</p>
                    <p className={styles.modal__pontos}>0 pts hoje</p>
                </div>
                <p className={styles.modal__privado_texto}>Privado: veja o que você pode fazer para impulsionar a turma hoje</p>

                <div className={styles.modal__acoes} role="radiogroup" aria-labelledby="titulo-contribuicao">
                    {acoes.map((item) => (
                        <label key={item.id} className={styles.modal__acao}>
                            <input
                                type="radio"
                                name="acao-individual"
                                value={item.id}
                                checked={acao === item.id}
                                onChange={() => onAcao(item.id)}
                            />
                            <span>
                                <span className={styles.modal__acao_titulo}>{item.titulo}</span>
                                <span className={styles.modal__acao_pontos}>+{item.pontos} pts</span>
                            </span>
                        </label>
                    ))}
                </div>

                <div className={styles.modal__rodape}>
                    <button type="button" className={styles.modal__proximo}>Próximo</button>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [aberto, setAberto] = useState(false)
    const [acao, setAcao] = useState('check-in')
    const botaoRef = useRef(null)
    const fecharRef = useRef(null)

    useEffect(() => {
        if (!aberto) return undefined

        const fecharNoEscape = (event) => {
            if (event.key === 'Escape') setAberto(false)
        }

        document.addEventListener('keydown', fecharNoEscape)
        const overflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const botao = botaoRef.current
        fecharRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', fecharNoEscape)
            document.body.style.overflow = overflow
            botao?.focus()
        }
    }, [aberto])

    return (
        <section className={styles.container}>
            
            <div className={styles['container__progress']}>
                <div className={styles['container__progress_percentage']}>
                    <div className={styles['container__progress_percentage-texts']}>
                        <p className={styles['container__progress_percentage-texts-title']}>META COLETIVA DA TURMA</p>
                        <h4 className={styles['container__progress_percentage-texts-subtitle']}>Estamos quase lá, juntos</h4>
                    </div>
                    <h3 className={styles['container__progress_percentage-number']}>{progresso}%</h3>
                </div>
                <div
                    className={styles['container__progress_bar']}
                    role="progressbar"
                    aria-valuenow={progresso}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Meta coletiva da turma"
                >
                    <div
                        className={styles['container__progress_bar-progress']}
                        style={{ width: `${progresso}%` }}
                    />
                    {marcos.map((marco) => {
                        const bloqueado = marco.valor === 100 && progresso < marco.valor
                        const feito = progresso >= marco.valor

                        return (
                            <div
                                key={marco.valor}
                                className={
                                    bloqueado
                                        ? `${styles['container__progress_bar-mark']} ${styles['container__progress_bar-mark--locked']}`
                                        : styles['container__progress_bar-mark']
                                }
                                style={{ '--mark': `${marco.valor}%` }}
                            >
                                {feito ? <IconeCheck /> : null}
                                {bloqueado ? <IconeCadeado /> : null}
                                <span className={styles['container__progress_bar-mark-label']}>
                                    {marco.rotulo}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <p className={styles['container__progress_prize']}>
                    <IconePresente />
                    <span>Prêmio coletivo da semana: <strong>Mapa Mental Fase 3</strong></span>
                </p>
                <button
                    ref={botaoRef}
                    type="button"
                    className={styles['container__progress_button']}
                    onClick={() => setAberto(true)}
                >
                    Detalhes da Meta
                </button>
            </div>

            <Salas />

            <ModalMeta
                aberto={aberto}
                onFechar={() => setAberto(false)}
                fecharRef={fecharRef}
                acao={acao}
                onAcao={setAcao}
            />
        </section>
    )
}
