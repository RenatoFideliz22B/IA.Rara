import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Plus } from '@phosphor-icons/react'
import avatarImg from '../../assets/avatars/2.png'
import styles from './Perfil.module.css'

export default function Perfil() {
    const [nome] = useState('Ana Beatriz Souza Almeida')
    const [curso] = useState('Análise e Desenvolvimento de Sistemas')
    const [apelido, setApelido] = useState('Bia')
    const [sobreMim, setSobreMim] = useState('')
    
    // Lista completa de tags disponíveis (pré-definidas + criadas pelo usuário)
    const [tags, setTags] = useState([
        '#TrabalhoEstudio',
        '#EstudoDeMadrugada',
        '#JogosIndie',
        '#CaféECode',
        '#PrimeiraGraduação',
        '#MãeeEstudante',
        '#Podcasts',
        '#Leitura',
        '#Música'
    ])
    
    // Tags selecionadas pelo usuário (começa com #CaféECode selecionada)
    const [tagsSelecionadas, setTagsSelecionadas] = useState(['#CaféECode'])
    
    const [novaTagInput, setNovaTagInput] = useState('')

    // Alterna entre selecionar e deselecionar a tag ao clicar
    const handleToggleTag = (tag) => {
        if (tagsSelecionadas.includes(tag)) {
            setTagsSelecionadas(tagsSelecionadas.filter(t => t !== tag))
        } else {
            setTagsSelecionadas([...tagsSelecionadas, tag])
        }
    }

    // Adiciona uma nova tag personalizada criada pelo usuário
    const handleAddTag = () => {
        if (!novaTagInput.trim()) return
        let formattedTag = novaTagInput.trim()
        if (!formattedTag.startsWith('#')) {
            formattedTag = '#' + formattedTag
        }
        if (!tags.includes(formattedTag)) {
            setTags([...tags, formattedTag])
            setTagsSelecionadas([...tagsSelecionadas, formattedTag])
        }
        setNovaTagInput('')
    }

    return (
        <section className={styles.container}>
            {/* Topo / Header */}
            <header className={styles.perfilHeader}>
                <h1>Meu Perfil e Edição de Identidade</h1>
                <p>É assim que a turma vai te ver na praça.</p>
            </header>

            {/* Seção 1: Avatar e Identidade Visual (Layout em Duas Colunas) */}
            <div className={styles.cardSection}>
                <h2>Avatar e Identidade Visual</h2>
                
                <div className={styles.avatarSectionLayout}>
                    {/* Coluna Esquerda: Avatar e Botão */}
                    <div className={styles.avatarColumn}>
                        <div className={styles.avatarWrapper}>
                            <img src={avatarImg} alt="Avatar do usuário" className={styles.avatarImg} />
                        </div>
                        <button type="button" className={styles.secondaryButton}>
                            Alterar avatar
                        </button>
                    </div>

                    {/* Coluna Direita: Inputs (Nome, Curso, Apelido) */}
                    <div className={styles.fieldsColumn}>
                        <div className={styles.inputGroup}>
                            <label>Nome completo</label>
                            <div className={styles.inputWithIcon}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input type="text" value={nome} disabled className={styles.disabledInput} />
                                <span className={styles.inputBadge}>via SSO</span>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Curso</label>
                            <div className={styles.inputWithIcon}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input type="text" value={curso} disabled className={styles.disabledInput} />
                                <span className={styles.inputBadge}>via SSO</span>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Apelido / Como quero ser chamado</label>
                            <input 
                                type="text" 
                                value={apelido} 
                                onChange={(e) => setApelido(e.target.value)} 
                                className={styles.standardInput}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção 2: Sobre Mim */}
            <div className={styles.cardSection}>
                <div className={styles.sectionHeaderBetween}>
                    <h2>Sobre Mim</h2>
                    <span className={styles.charCounter}>{sobreMim.length}/140</span>
                </div>
                <textarea 
                    maxLength={140}
                    rows={4}
                    placeholder="Conte um pouco sobre você fora das aulas (hobbies, séries, café ou jogos)..."
                    value={sobreMim}
                    onChange={(e) => setSobreMim(e.target.value)}
                    className={styles.textareaCustom}
                />
            </div>

            {/* Seção 3: Tags de Rotina e Interesses */}
            <div className={styles.cardSection}>
                <h2>Minhas Tags de Rotina e Interesses</h2>
                
                <div className={styles.tagsContainer}>
                    {tags.map((tag, index) => {
                        const isSelected = tagsSelecionadas.includes(tag)
                        return (
                            <span 
                                key={index} 
                                onClick={() => handleToggleTag(tag)}
                                className={`${styles.tagBadge} ${isSelected ? styles.tagHighlight : ''}`}
                            >
                                {tag}
                            </span>
                        )
                    })}
                </div>

                <div className={styles.addTagWrapper}>
                    <input 
                        type="text"
                        placeholder="Criar nova tag, ex: #CaféETelaPreta"
                        value={novaTagInput}
                        onChange={(e) => setNovaTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                        className={styles.standardInput}
                    />
                    <button 
                        type="button" 
                        onClick={handleAddTag} 
                        className={styles.addTagButton}
                    >
                        <Plus size={16} weight="bold" /> Adicionar
                    </button>
                </div>
            </div>

            {/* Ações Inferiores */}
            <div className={styles.formActions}>
                <Link to="/praca" className={styles.btnCancel}>
                    Cancelar
                </Link>
                <button type="button" className={styles.btnSave}>
                    Salvar Alterações
                </button>
            </div>
        </section>
    )
}
