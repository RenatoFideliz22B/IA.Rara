
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import './App.css'

import iconeRara from './assets/iconeRara.png'
import setaAtualizar from './assets/setaAtualizar.png'

const ASSISTANT_NAME = 'IA.Rara'
const STORAGE_KEY = 'IA.Rara-chat'

// URL do backend
const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3001'
).replace(/\/$/, '')

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Recupera as mensagens salvas
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY)
      return savedMessages ? JSON.parse(savedMessages) : []
    } catch (error) {
      console.error('Erro ao recuperar conversa:', error)
      return []
    }
  })

  // Salva automaticamente sempre que as mensagens mudarem
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  // Inicia uma nova conversa
  function createConversation() {
    if (loading) return

    setMessages([])
    setMessage('')
  }

  // Envia mensagem ao backend
  async function handleSubmit(event) {
    event.preventDefault()

    if (!message.trim() || loading) return

    const currentMessage = message.trim()

    const history = [
      ...messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        text: msg.text
      })),
      {
        role: 'user',
        text: currentMessage
      }
    ]

    setMessages((previous) => [
      ...previous,
      {
        text: currentMessage,
        sender: 'user'
      }
    ])

    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: currentMessage,
          history
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem.')
      }

      setMessages((previous) => [
        ...previous,
        {
          text: data.reply,
          sender: 'ai'
        }
      ])

    } catch (error) {
      console.error('Erro no chat:', error)

      setMessages((previous) => [
        ...previous,
        {
          text: 'Não consegui obter uma resposta. Verifique sua conexão e tente novamente.',
          sender: 'ai'
        }
      ])

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="assistant-widget">

      {/* JANELA DO ASSISTENTE */}

      {isOpen && (
        <section className="assistant-window">

          {/* CABEÇALHO */}

          <header className="assistant-header">

            <div className="assistant-identity">

              <div className="assistant-avatar">
                <img
                  src={iconeRara}
                  alt=""
                  style={{
                    width: '25px',
                    height: '25px',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div className="assistant-info">
                <h2>{ASSISTANT_NAME}</h2>
                <span>
                  <span className="online-indicator"></span>
                  Assistente Virtual
                </span>
              </div>

            </div>

            <div className="assistant-controls">

              <button
                type="button"
                className="assistant-control-button"
                onClick={createConversation}
                disabled={loading}
                title="Nova conversa"
                aria-label="Nova conversa"
              >
                <img
                  src={setaAtualizar}
                  alt=""
                  style={{
                    width: '18px',
                    height: '18px',
                    objectFit: 'contain'
                  }}
                />
              </button>

            </div>

          </header>

          {/* CONTEÚDO DA CONVERSA */}

          <div className="assistant-chat">

            {messages.length === 0 ? (

              <div className="assistant-welcome">

                <div className="welcome-icon">
                  <img
                    src={iconeRara}
                    alt=""
                    style={{
                      width: '33px',
                      height: '33px',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                <h3>Olá! Como posso ajudar?</h3>

                <p>
                  Estou aqui para ajudar você a explorar
                  oportunidades, encontrar pessoas e aproveitar
                  melhor sua experiência.
                </p>

              </div>

            ) : (

              <div className="assistant-messages">

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`assistant-message ${msg.sender}-message`}
                  >
                    {msg.sender === 'ai' ? (
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="assistant-message ai-message loading-message">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}

              </div>

            )}

          </div>

          {/* CAMPO DE MENSAGEM */}

          <div className="assistant-footer">

            <form
              className="assistant-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading || !message.trim()}
                aria-label="Enviar mensagem"
              >
                ↑
              </button>

            </form>

            <p className="assistant-disclaimer">
              As respostas podem conter imprecisões.
              Verifique informações importantes.
            </p>

          </div>

        </section>
      )}

      {/* BOTÃO FLUTUANTE */}

      <button
        type="button"
        className={`assistant-launcher ${isOpen ? 'launcher-active' : ''}`}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          '×'
        ) : (
          <img
            src={iconeRara}
            alt=""
            style={{
              width: '32px',
              height: '32px',
              objectFit: 'contain'
            }}
          />
        )}
      </button>

    </div>
  )
}

export default App
