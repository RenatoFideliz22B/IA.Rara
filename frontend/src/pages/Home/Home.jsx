
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookmarkSimple } from '@phosphor-icons/react'

import { salasPorInteresse, obterTotalOnline } from '../../data/salas'
import {
    obterAlunosDemo,
    obterAvatarDoPerfil
} from '../../data/alunos'

import Button from '../../components/ui/Button/Button'
import styles from './Home.module.css'

const CHAVE_HOME = 'trocaiHome'

const marcos = [
    { valor: 30, rotulo: '30%' },
    { valor: 60, rotulo: '60%' },
    { valor: 100, rotulo: '100%' },
]

const acoes = [
    {
        id: 'check-in',
        titulo: 'Fazer Check-in Diário',
        descricao: 'Entre na plataforma para registrar sua presença diária.',
        pontos: 10
    },
    {
        id: 'bio',
        titulo: 'Completar a bio do perfil',
        descricao: 'Conte um pouco sobre você e ajude seus colegas a conhecerem você melhor.',
        pontos: 15
    },
    {
        id: 'encontro',
        titulo: 'Participar de um Encontro Guiado',
        descricao: 'Responda às perguntas quebra-gelo e participe do próximo encontro.',
        pontos: 25
    },
]

const perguntas = [
    {
        id: 'hobby',
        texto: 'Qual projeto ou hobby fora da faculdade te ajuda a desligar a mente?'
    },
    {
        id: 'dica',
        texto: 'Qual foi a melhor dica de estudo que você já recebeu?'
    },
    {
        id: 'horario',
        texto: 'Que horário do dia rende mais para você estudar?'
    },
]

const respostasParticipante = {
    hobby: 'Gosto de desenhar e jogar videogame. É uma forma de descansar depois de um dia cheio.',
    dica: 'Dividir tarefas grandes em pequenas etapas. Assim, fica muito mais fácil começar.',
    horario: 'Prefiro estudar à noite, quando consigo ficar mais concentrado.'
}

function obterDataAtual() {
    const hoje = new Date()

    const ano = hoje.getFullYear()
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const dia = String(hoje.getDate()).padStart(2, '0')

    return `${ano}-${mes}-${dia}`
}

function obterSalasDoPerfil() {
    try {
        const perfil = JSON.parse(localStorage.getItem('trocaiPerfil')) || {}

        return (perfil.interesses || [])
            .map(interesse => salasPorInteresse[interesse])
            .filter(Boolean)
            .map(sala => ({
                ...sala,
                online: obterTotalOnline(sala)
            }))
    } catch {
        return []
    }
}

function obterPerfilSalvo() {
    try {
        return JSON.parse(localStorage.getItem('trocaiPerfil')) || {}
    } catch {
        return {}
    }
}

function obterEstadoHome() {
    const hoje = obterDataAtual()

    let estadoSalvo

    try {
        estadoSalvo = JSON.parse(localStorage.getItem(CHAVE_HOME)) || {}
    } catch {
        estadoSalvo = {}
    }

    let missoes = estadoSalvo.missoesConcluidas || []

    if (estadoSalvo.dataCheckIn !== hoje) {
        missoes = missoes.filter(id => id !== 'check-in')
        missoes.push('check-in')
    }

    const perfil = obterPerfilSalvo()

    if (perfil.sobreMim?.trim()) {
        if (!missoes.includes('bio')) {
            missoes.push('bio')
        }
    } else {
        missoes = missoes.filter(id => id !== 'bio')
    }

    return {
        missoesConcluidas: [...new Set(missoes)],
        respostas: {
            hobby: estadoSalvo.respostas?.hobby || '',
            dica: estadoSalvo.respostas?.dica || '',
            horario: estadoSalvo.respostas?.horario || ''
        },
        respostasEnviadas: estadoSalvo.respostasEnviadas || null,
        dataCheckIn: hoje
    }
}

function obterPassosPerfil() {
    const perfil = obterPerfilSalvo()

    return [
        {
            id: 'apelido',
            titulo: 'Adicionar um apelido',
            concluido: Boolean(perfil.apelido?.trim())
        },
        {
            id: 'bio',
            titulo: 'Escrever a bio',
            concluido: Boolean(perfil.sobreMim?.trim())
        }
    ]
}

function obterAlunosDaTurma() {
    const perfil = obterPerfilSalvo()
    const temaFiap = localStorage.getItem('trocaiTema') === 'fiap'

    const avatarAtual = perfil.avatar?.tipo === 'personalizado'
        ? perfil.avatar.imagem
        : obterAvatarDoPerfil(perfil.avatar, temaFiap)

    const tagsDoAluno = [
        ...(perfil.interesses || [])
            .map(interesse => salasPorInteresse[interesse]?.tag)
            .filter(Boolean),
        ...(perfil.tagsSelecionadasPersonalizadas || [])
    ]

    const alunoAtual = {
        id: 'voce',
        apelido: perfil.apelido?.trim() || 'Você',
        nomeCompleto: 'Ana Beatriz Souza Almeida',
        avatar: avatarAtual,
        bio: perfil.sobreMim?.trim() || 'Este aluno ainda não adicionou uma bio.',
        interesses: tagsDoAluno,
        proprio: true
    }

    return [
        alunoAtual,
        ...obterAlunosDemo(temaFiap)
    ]
}

function IconeCheck() {
    return (
        <svg className={styles.marcoIcone} viewBox="0 0 16 16" aria-hidden="true">
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
        <svg className={classe || styles.marcoIcone} viewBox="0 0 16 16" aria-hidden="true">
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
        <svg className={styles.premioIcone} viewBox="0 0 16 16" aria-hidden="true">
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
        <svg className={styles.salaEntrarIcone} viewBox="0 0 16 16" aria-hidden="true">
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

function ChamadaPerfil({ passos }) {
    const concluidos = passos.filter(passo => passo.concluido).length
    const porcentagem = Math.round((concluidos / passos.length) * 100)

    const apelidoPendente = passos.some(
        passo => passo.id === 'apelido' && !passo.concluido
    )

    return (
        <section className={styles.perfilCard} aria-labelledby="titulo-completar-perfil">
            <div className={styles.perfilTopo}>
                <div className={styles.perfilTextos}>
                    <h2 id="titulo-completar-perfil" className={styles.perfilTitulo}>
                        Complete seu perfil
                    </h2>

                    <p className={styles.perfilTexto}>
                        Adicione um apelido e uma bio para a turma te conhecer melhor.
                    </p>
                </div>

                <Button
                    to={apelidoPendente ? '/perfil' : '/perfil#sobre-mim'}
                    variant="shadow"
                    size="sm"
                    className={styles.perfilBotao}
                >
                    Completar perfil
                </Button>
            </div>

            <div className={styles.perfilProgresso}>
                <div
                    className={styles.perfilBarra}
                    role="progressbar"
                    aria-valuenow={porcentagem}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progresso do perfil"
                >
                    <div
                        className={styles.perfilBarraPreenchida}
                        style={{ width: `${porcentagem}%` }}
                    />
                </div>

                <span className={styles.perfilPorcentagem}>
                    {porcentagem}%
                </span>
            </div>

            <ul className={styles.perfilPassos}>
                {passos.map(passo => (
                    <li
                        key={passo.id}
                        className={`${styles.perfilPasso} ${passo.concluido ? styles.perfilPassoConcluido : ''
                            }`}
                    >
                        <span
                            className={`${styles.perfilPassoBolinha} ${passo.concluido ? styles.perfilPassoBolinhaConcluida : ''
                                }`}
                            aria-hidden="true"
                        >
                            {passo.concluido && <IconeCheck />}
                        </span>

                        {passo.titulo}

                        <span className={styles.somenteLeitor}>
                            {passo.concluido ? ' (concluído)' : ' (pendente)'}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

function BotaoEntrar({ sala }) {
    return (
        <Button
            to={`/sala/${sala.id}`}
            variant="neutral"
            size="sm"
            className={styles.salaEntrar}
            aria-label={`Entrar na sala ${sala.nome}`}
        >
            <IconeEntrar />
            Entrar
        </Button>
    )
}

function Salas({
    salas,
    participando,
    respostas,
    onAbrirEncontro,
    botaoEncontroRef
}) {
    return (
        <section className={styles.salas} aria-labelledby="titulo-salas">
            <h2 id="titulo-salas" className={styles.salasTitulo}>
                Salas & Encontros Rápidos
            </h2>

            <p className={styles.salasTexto}>
                Converse com quem tem a ver com você ou participe de uma dinâmica guiada.
            </p>

            <p className={styles.salasRotulo}>
                Salas de bate-papo ativas por afinidade
            </p>

            <ul className={styles.salasLista}>
                {salas.length > 0 ? (
                    salas.map(sala => {
                        const IconeSala = sala.icone

                        return (
                            <li key={sala.id} className={styles.salaItem}>
                                <IconeSala
                                    className={styles.salaIcone}
                                    size={22}
                                    weight="thin"
                                    aria-hidden="true"
                                />

                                <span className={styles.salaInfo}>
                                    <span className={styles.salaNome}>
                                        {sala.hashtag}
                                    </span>

                                    <span className={styles.salaDetalhe}>
                                        {sala.tag} · {sala.online} online
                                    </span>
                                </span>

                                <BotaoEntrar sala={sala} />
                            </li>
                        )
                    })
                ) : (
                    <li className={styles.salaItem}>
                        Você ainda não selecionou interesses para encontrar salas.
                    </li>
                )}
            </ul>

            <div className={styles.encontroPainel} id="encontro-guiado">
                <div className={styles.encontro}>
                    <span className={styles.encontroIcone} aria-hidden="true">
                        <IconeCalendario />
                    </span>

                    <span className={styles.encontroTextos}>
                        <span className={styles.encontroRotulo}>
                            Próximo encontro guiado anti-timidez
                        </span>

                        <span className={styles.encontroTitulo}>
                            Quinta, 20h · grupos de 4 por afinidade
                        </span>
                    </span>

                    <Button
                        ref={botaoEncontroRef}
                        variant={participando ? 'success' : 'shadow'}
                        className={styles.encontroBotao}
                        onClick={onAbrirEncontro}
                        aria-label={participando ? 'Visualizar respostas do encontro' : 'Quero participar do encontro'}
                    >
                        {participando ? (
                            <>
                                <BookmarkSimple size={18} weight="fill" />
                                Participando
                            </>
                        ) : (
                            'Quero participar'
                        )}
                    </Button>
                </div>

                <p className={styles.perguntasRotulo}>
                    {participando ? 'Suas respostas para o encontro' : 'Prévia das perguntas quebra-gelo'}
                </p>

                {participando ? (
                    <>
                        <div className={styles.respostasEncontro}>
                            {perguntas.map(pergunta => (
                                <div key={pergunta.id} className={styles.respostaCard}>
                                    <p className={styles.respostaPergunta}>
                                        {pergunta.texto}
                                    </p>

                                    <p className={styles.respostaTexto}>
                                        {respostas[pergunta.id]}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className={styles.participantesEncontro}>
                            <p className={styles.participantesTitulo}>
                                Outros participantes
                            </p>

                            <p className={styles.participantesTexto}>
                                Confira as respostas de quem também vai participar do encontro.
                            </p>

                            <div className={styles.participantesLista}>
                                <div className={styles.participanteItem}>
                                    <span className={styles.participanteInfo}>
                                        <strong>Gabriel Oliveira</strong>
                                        <span>Respondeu às perguntas</span>
                                    </span>
                                </div>

                                {perguntas.map(pergunta => (
                                    <div key={pergunta.id} className={styles.respostaCard}>
                                        <p className={styles.respostaPergunta}>
                                            {pergunta.texto}
                                        </p>

                                        <p className={styles.respostaTexto}>
                                            {respostasParticipante[pergunta.id]}
                                        </p>
                                    </div>
                                ))}

                                {[3, 4].map(numero => (
                                    <div key={numero} className={styles.participanteItem}>
                                        <span className={styles.participanteAvatar}>
                                            {numero}
                                        </span>

                                        <span className={styles.participanteInfo}>
                                            <strong>Participante {numero}</strong>
                                            <span>Aguardando respostas</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <ul className={styles.perguntasLista}>
                        {perguntas.map(pergunta => (
                            <li key={pergunta.id} className={styles.pergunta}>
                                {pergunta.texto}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

function AlunosTurma({ alunos, onSelecionarAluno }) {
    const [expandida, setExpandida] = useState(false)

    const alunosVisiveis = expandida ? alunos : alunos.slice(0, 5)

    return (
        <section className={styles.alunosCard} aria-labelledby="titulo-alunos">
            <div className={styles.alunosTopo}>
                <div>
                    <h2 id="titulo-alunos" className={styles.alunosTitulo}>
                        Sua turma
                    </h2>

                    <p className={styles.alunosTexto}>
                        Conheça seus colegas e descubra o que vocês têm em comum.
                    </p>
                </div>

                <span className={styles.alunosContagem}>
                    {alunos.length} alunos
                </span>
            </div>

            <ul className={styles.alunosLista}>
                {alunosVisiveis.map(aluno => (
                    <li key={aluno.id} className={styles.alunoItem}>
                        <button
                            type="button"
                            className={styles.alunoBotao}
                            onClick={() => onSelecionarAluno(aluno)}
                            aria-label={`Ver perfil de ${aluno.apelido}`}
                        >
                            <img
                                className={styles.alunoAvatar}
                                src={aluno.avatar}
                                alt=""
                            />

                            <span className={styles.alunoInfo}>
                                <strong>{aluno.apelido}</strong>
                                <span>
                                    {aluno.proprio ? 'Seu perfil' : 'Ver perfil'}
                                </span>
                            </span>

                            <svg
                                className={styles.alunoSeta}
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                            >
                                <path
                                    d="m6 3 5 5-5 5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            {alunos.length > 5 && (
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => setExpandida(anterior => !anterior)}
                    aria-expanded={expandida}
                    className={styles.alunosVerMais}
                >
                    {expandida ? 'Ver menos' : 'Ver mais'}

                    <svg
                        className={`${styles.alunosVerMaisIcone} ${expandida ? styles.alunosVerMaisIconeAberta : ''
                            }`}
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                    >
                        <path
                            d="m3 6 5 5 5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            )}
        </section>
    )
}

function ModalAluno({ aluno, onFechar }) {
    useEffect(() => {
        if (!aluno) return undefined

        const overflowAnterior = document.body.style.overflow

        const fecharNoEscape = event => {
            if (event.key === 'Escape') onFechar()
        }

        document.addEventListener('keydown', fecharNoEscape)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', fecharNoEscape)
            document.body.style.overflow = overflowAnterior
        }
    }, [aluno, onFechar])

    if (!aluno) return null

    return (
        <div className={styles.modal} onClick={onFechar}>
            <div
                className={styles.modalAluno}
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-aluno"
                onClick={event => event.stopPropagation()}
            >
                <div className={styles.modalAlunoTopo}>
                    <button
                        type="button"
                        className={styles.modalFechar}
                        onClick={onFechar}
                        aria-label="Fechar perfil"
                    >
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path
                                d="M4 4l8 8M12 4 4 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className={styles.modalAlunoPerfil}>
                    <img
                        className={styles.modalAlunoAvatar}
                        src={aluno.avatar}
                        alt={`Avatar de ${aluno.apelido}`}
                    />

                    <h2 id="titulo-modal-aluno" className={styles.modalAlunoNome}>
                        {aluno.nomeCompleto}
                    </h2>

                    <p className={styles.modalAlunoApelido}>
                        {aluno.apelido}
                    </p>

                </div>

                <div className={styles.modalAlunoSecao}>
                    <h3>Sobre mim</h3>

                    <p>
                        {aluno.bio || 'Este aluno ainda não adicionou uma bio.'}
                    </p>
                </div>

                <div className={styles.modalAlunoSecao}>
                    <h3>Interesses</h3>

                    {aluno.interesses.length > 0 ? (
                        <div className={styles.modalAlunoTags}>
                            {aluno.interesses.map(tag => (
                                <span key={tag} className={styles.modalAlunoTag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p>Este aluno ainda não selecionou interesses.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

function ModalMeta({
    aberto,
    onFechar,
    fecharRef,
    missoesConcluidas,
    pontos,
    progresso,
    onAbrirEncontro
}) {
    if (!aberto) return null

    return (
        <div className={styles.modal} onClick={onFechar}>
            <div
                className={styles.modalJanela}
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-meta"
                onClick={event => event.stopPropagation()}
            >
                <div className={styles.modalTopo}>
                    <h2 id="titulo-meta" className={styles.modalTitulo}>
                        Meta Coletiva & Ações Individuais
                    </h2>

                    <button
                        ref={fecharRef}
                        type="button"
                        className={styles.modalFechar}
                        aria-label="Fechar"
                        onClick={onFechar}
                    >
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 4l8 8M12 4 4 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <p className={styles.modalSecao}>
                    Coletivo - Status da turma
                </p>

                <div className={styles.modalStatus}>
                    <div className={styles.modalStatusItem}>
                        <p className={styles.modalStatusRotulo}>Progresso geral</p>
                        <p className={styles.modalStatusValor}>{progresso}%</p>
                    </div>

                    <div className={styles.modalStatusItem}>
                        <p className={styles.modalStatusRotulo}>Dias restantes</p>
                        <p className={styles.modalStatusValor}>2 dias</p>
                    </div>
                </div>

                <div className={styles.modalBarra}>
                    <div
                        className={styles.modalBarraPreenchida}
                        style={{ width: `${progresso}%` }}
                    />
                </div>

                <div className={styles.modalPremio}>
                    <IconeCadeado classe={styles.modalPremioIcone} />

                    <div>
                        <p className={styles.modalPremioRotulo}>
                            Prêmio ao atingir 100%
                        </p>

                        <p className={styles.modalPremioTitulo}>
                            Material de Apoio: Mapa Mental Fase 3
                        </p>

                        <p className={styles.modalPremioTexto}>
                            Templates e resumos liberados para toda a turma.
                        </p>
                    </div>
                </div>

                <div className={styles.modalPrivado}>
                    <p className={styles.modalSecao}>
                        Privativo - Minha contribuição
                    </p>

                    <p className={styles.modalPontos}>
                        {pontos} pts hoje
                    </p>
                </div>

                <p className={styles.modalPrivadoTexto}>
                    Complete atividades para impulsionar a meta da turma e ganhar pontos.
                </p>

                <div className={styles.modalAcoes}>
                    {acoes.map(item => {
                        const concluida = missoesConcluidas.includes(item.id)

                        const conteudo = (
                            <>
                                <span
                                    className={`${styles.modalAcaoBolinha} ${concluida ? styles.modalAcaoBolinhaConcluida : ''
                                        }`}
                                    aria-hidden="true"
                                >
                                    {concluida && <IconeCheck />}
                                </span>

                                <span className={styles.modalAcaoConteudo}>
                                    <span className={styles.modalAcaoTitulo}>
                                        {item.titulo}
                                    </span>

                                    <span className={styles.modalAcaoDescricao}>
                                        {item.descricao}
                                    </span>

                                    <span className={styles.modalAcaoPontos}>
                                        +{item.pontos} pts
                                    </span>
                                </span>
                            </>
                        )

                        if (item.id === 'bio') {
                            return (
                                <Link
                                    key={item.id}
                                    to="/perfil#sobre-mim"
                                    className={`${styles.modalAcao} ${styles.modalAcaoLink}`}
                                    onClick={onFechar}
                                >
                                    {conteudo}
                                </Link>
                            )
                        }

                        if (item.id === 'encontro' && !concluida) {
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`${styles.modalAcao} ${styles.modalAcaoBotao}`}
                                    onClick={onAbrirEncontro}
                                >
                                    {conteudo}
                                </button>
                            )
                        }

                        return (
                            <div
                                key={item.id}
                                className={`${styles.modalAcao} ${concluida ? styles.modalAcaoConcluida : ''
                                    }`}
                            >
                                {conteudo}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function ModalEncontro({
    aberto,
    onFechar,
    fecharRef,
    respostas,
    onResposta,
    onEnviar
}) {
    if (!aberto) return null

    return (
        <div className={styles.modal} onClick={onFechar}>
            <div
                className={styles.modalJanela}
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-encontro"
                onClick={event => event.stopPropagation()}
            >
                <div className={styles.modalTopo}>
                    <div>
                        <p className={styles.modalSecao}>
                            Encontro guiado anti-timidez
                        </p>

                        <h2 id="titulo-modal-encontro" className={styles.modalTitulo}>
                            Vamos quebrar o gelo?
                        </h2>
                    </div>

                    <button
                        ref={fecharRef}
                        type="button"
                        className={styles.modalFechar}
                        aria-label="Fechar"
                        onClick={onFechar}
                    >
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M4 4l8 8M12 4 4 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <p className={styles.modalPrivadoTexto}>
                    Responda às perguntas abaixo para confirmar sua participação. Suas respostas serão compartilhadas com os outros participantes do encontro.
                </p>

                <form className={styles.formEncontro} onSubmit={onEnviar}>
                    {perguntas.map((pergunta, index) => (
                        <label key={pergunta.id} className={styles.perguntaFormulario}>
                            <span className={styles.perguntaFormularioTitulo}>
                                {index + 1}. {pergunta.texto}
                            </span>

                            <textarea
                                value={respostas[pergunta.id]}
                                onChange={event => onResposta(pergunta.id, event.target.value)}
                                placeholder="Escreva sua resposta..."
                                rows={3}
                                maxLength={300}
                                required
                            />
                        </label>
                    ))}

                    <div className={styles.modalRodape}>
                        <Button variant="neutral" onClick={onFechar}>
                            Cancelar
                        </Button>

                        <Button type="submit" variant="primary">
                            Confirmar participação
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function Home() {
    const [aberto, setAberto] = useState(false)
    const [encontroModalAberto, setEncontroModalAberto] = useState(false)

    const [estadoInicial] = useState(obterEstadoHome)

    const [missoesConcluidas, setMissoesConcluidas] = useState(
        estadoInicial.missoesConcluidas
    )

    const [respostas, setRespostas] = useState(estadoInicial.respostas)

    const [respostasEnviadas, setRespostasEnviadas] = useState(
        estadoInicial.respostasEnviadas
    )

    const [salas] = useState(obterSalasDoPerfil)
    const [passosPerfil] = useState(obterPassosPerfil)
    const [alunos] = useState(obterAlunosDaTurma)

    const [alunoSelecionado, setAlunoSelecionado] = useState(null)

    const perfilIncompleto = passosPerfil.some(passo => !passo.concluido)
    const participando = respostasEnviadas !== null

    const botaoRef = useRef(null)
    const fecharRef = useRef(null)
    const botaoEncontroRef = useRef(null)
    const fecharEncontroRef = useRef(null)

    const fecharModalAluno = useCallback(() => {
        setAlunoSelecionado(null)
    }, [])

    useEffect(() => {
        localStorage.setItem(CHAVE_HOME, JSON.stringify({
            missoesConcluidas,
            respostas,
            respostasEnviadas,
            dataCheckIn: obterDataAtual()
        }))
    }, [missoesConcluidas, respostas, respostasEnviadas])

    const pontos = acoes
        .filter(item => missoesConcluidas.includes(item.id))
        .reduce((total, item) => total + item.pontos, 0)

    const progresso = 78
        + (missoesConcluidas.includes('bio') ? 1 : 0)
        + (missoesConcluidas.includes('encontro') ? 2 : 0)

    function abrirModalEncontro() {
        setAberto(false)
        setEncontroModalAberto(true)
    }

    function irParaEncontro() {
        setAberto(false)

        setTimeout(() => {
            document.getElementById('encontro-guiado')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 150)
    }

    function atualizarResposta(id, valor) {
        setRespostas(anterior => ({
            ...anterior,
            [id]: valor
        }))
    }

    function enviarRespostas(event) {
        event.preventDefault()

        setRespostasEnviadas({ ...respostas })

        setMissoesConcluidas(anterior => (
            anterior.includes('encontro')
                ? anterior
                : [...anterior, 'encontro']
        ))

        setEncontroModalAberto(false)
    }

    useEffect(() => {
        if (!aberto) return undefined

        const botao = botaoRef.current
        const overflow = document.body.style.overflow

        const fecharNoEscape = event => {
            if (event.key === 'Escape') setAberto(false)
        }

        document.addEventListener('keydown', fecharNoEscape)
        document.body.style.overflow = 'hidden'
        fecharRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', fecharNoEscape)
            document.body.style.overflow = overflow
            botao?.focus()
        }
    }, [aberto])

    useEffect(() => {
        if (!encontroModalAberto) return undefined

        const botao = botaoEncontroRef.current
        const overflow = document.body.style.overflow

        const fecharNoEscape = event => {
            if (event.key === 'Escape') setEncontroModalAberto(false)
        }

        document.addEventListener('keydown', fecharNoEscape)
        document.body.style.overflow = 'hidden'
        fecharEncontroRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', fecharNoEscape)
            document.body.style.overflow = overflow
            botao?.focus()
        }
    }, [encontroModalAberto])

    return (
        <section className={styles.container}>
            <header className={styles.cabecalho}>
                <h1 className={styles.titulo}>A Praça</h1>
            </header>

            {perfilIncompleto && <ChamadaPerfil passos={passosPerfil} />}

            <div className={styles.metaCard}>
                <div className={styles.metaTopo}>
                    <div className={styles.metaTextos}>
                        <p className={styles.metaRotulo}>
                            META COLETIVA DA TURMA
                        </p>

                        <h4 className={styles.metaSubtitulo}>
                            Estamos quase lá, juntos
                        </h4>
                    </div>

                    <h3 className={styles.metaPorcentagem}>
                        {progresso}%
                    </h3>
                </div>

                <div
                    className={styles.barra}
                    role="progressbar"
                    aria-valuenow={progresso}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Meta coletiva da turma"
                >
                    <div
                        className={styles.barraPreenchida}
                        style={{ width: `${progresso}%` }}
                    />

                    {marcos.map(marco => {
                        const bloqueado = marco.valor === 100 && progresso < marco.valor
                        const feito = progresso >= marco.valor

                        return (
                            <div
                                key={marco.valor}
                                className={
                                    bloqueado
                                        ? `${styles.marco} ${styles.marcoBloqueado}`
                                        : styles.marco
                                }
                                style={{ '--mark': `${marco.valor}%` }}
                            >
                                {feito && <IconeCheck />}
                                {bloqueado && <IconeCadeado />}

                                <span className={styles.marcoRotulo}>
                                    {marco.rotulo}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <p className={styles.premio}>
                    <IconePresente />

                    <span>
                        Prêmio coletivo da semana: <strong>Mapa Mental Fase 3</strong>
                    </span>
                </p>

                <Button
                    ref={botaoRef}
                    variant="primary"
                    fullWidth
                    onClick={() => setAberto(true)}
                >
                    Detalhes da Meta
                </Button>
            </div>

            <AlunosTurma
                alunos={alunos}
                onSelecionarAluno={setAlunoSelecionado}
            />

            <Salas
                salas={salas}
                participando={participando}
                respostas={respostasEnviadas || respostas}
                botaoEncontroRef={botaoEncontroRef}
                onAbrirEncontro={() => {
                    if (!participando) abrirModalEncontro()
                }}
            />

            <ModalMeta
                aberto={aberto}
                onFechar={() => setAberto(false)}
                fecharRef={fecharRef}
                missoesConcluidas={missoesConcluidas}
                pontos={pontos}
                progresso={progresso}
                onAbrirEncontro={irParaEncontro}
            />

            <ModalEncontro
                aberto={encontroModalAberto}
                onFechar={() => setEncontroModalAberto(false)}
                fecharRef={fecharEncontroRef}
                respostas={respostas}
                onResposta={atualizarResposta}
                onEnviar={enviarRespostas}
            />

            <ModalAluno
                aluno={alunoSelecionado}
                onFechar={fecharModalAluno}
            />
        </section>
    )
}
