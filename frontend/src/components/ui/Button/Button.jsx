import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/*
  Botão compartilhado do projeto.

  variant:
    'primary'  botão cheio na cor secundária (ação principal)
    'shadow'   igual ao primary, com sombra sólida (ex.: "Quero participar", "Salvar")
    'outline'  só contorno, na cor de destaque (ex.: "+ Adicionar")
    'neutral'  contorno cinza e fundo da seção (ex.: "Cancelar", "Entrar" na sala)
    'success'  estado concluído (ex.: "Participando")

  size:       'md' (padrão) ou 'sm'
  fullWidth:  ocupa toda a largura disponível
  to:         se passado, vira um <Link> do react-router
  as:         troca a tag (ex.: as="label" com htmlFor)
  O restante das props (onClick, type, aria-label, ref...) vai direto para o elemento.
*/
export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    to,
    as,
    className = '',
    children,
    ...props
}) {
    const Component = as || (to ? Link : 'button')

    const classes = [
        styles.button,
        styles[variant],
        size === 'sm' ? styles.small : '',
        fullWidth ? styles.fullWidth : '',
        className
    ]
        .filter(Boolean)
        .join(' ')

    const padrao = Component === 'button' ? { type: 'button' } : {}

    return (
        <Component className={classes} {...padrao} {...props} {...(to ? { to } : {})}>
            {children}
        </Component>
    )
}
