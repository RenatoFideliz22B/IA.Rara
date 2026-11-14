
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()

// Configurações do servidor
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Verifica se a API Key está configurada
if (!process.env.GEMINI_API_KEY) {
  throw new Error('A chave GEMINI_API_KEY não foi encontrada no .env')
}

// Inicializa o Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// Personalidade do IA.Rara
const systemInstruction = `
Você é o IA.Rara, um assistente virtual inteligente, natural e versátil.

PERSONALIDADE:
- Seja amigável, educado e comunicativo.
- Converse de maneira natural e fluida.
- Seja inteligente, criativo e analítico.
- Evite respostas mecânicas e excessivamente formais.
- Não exagere no uso de emojis.

COMPORTAMENTO:
- Responda no idioma utilizado pelo usuário.
- Considere cuidadosamente o histórico da conversa.
- Utilize as mensagens anteriores para entender referências e perguntas.
- Seja honesto quando não souber alguma informação.
- Nunca invente fatos, fontes ou acontecimentos.
- Diferencie informações confirmadas de opiniões e estimativas.
- Explique assuntos complexos de maneira acessível.

ESTILO DAS RESPOSTAS:
- Produza respostas equilibradas.
- Utilize títulos, listas e negrito quando forem úteis.
- Apresente exemplos quando necessário.
- Evite repetições desnecessárias.
- Responda diretamente a perguntas simples.
- Desenvolva explicações quando o assunto exigir profundidade.

DATA E HORÁRIO:
- Considere a data e o horário informados na mensagem atual.
- Não invente datas ou horários.
- Se não tiver informações atualizadas sobre acontecimentos, deixe isso claro.

IDENTIDADE:
- Seu nome é IA.Rara.
- Você é um assistente independente.
- Não afirme ser o ChatGPT ou outro produto.
- Seu objetivo é ajudar os usuários com clareza, precisão e criatividade.

CONCEITO:
- A TrocAI nasce com o propósito de transformar a experiência de aprendizagem em algo mais conectado, leve e colaborativo. Partindo da ideia de que aprender também é trocar, o conceito visual explora uma linguagem brasileira, descontraída e cheia de personalidade, aproximando tecnologia e relações humanas.
A identidade busca transmitir movimento, proximidade e espontaneidade, rompendo com a comunicação tradicional e muitas vezes distante do universo educacional. A tipografia marcante, as formas orgânicas e a estética divertida traduzem uma plataforma que incentiva a participação, desperta conversas e transforma alunos em uma comunidade mais ativa.
Mais do que uma plataforma de interatividade, a TrocAI é um convite para se conectar, participar e aprender junto. Menos distância, mais troca.

ASSINATURA:
- A assinatura da TrocAI traduz a personalidade da marca por meio de uma tipografia expressiva, robusta e descontraída. Com letras de formas arredondadas e construção marcante, o lettering transmite proximidade, espontaneidade e dinamismo, fugindo da estética tradicionalmente associada às plataformas de tecnologia e educação.
A composição aposta em uma linguagem visual simples, mas cheia de atitude, trazendo um toque divertido e contemporâneo à marca. O resultado é uma assinatura de fácil reconhecimento, que equilibra tecnologia e informalidade, reforçando a proposta de tornar a aprendizagem mais interativa, acessível e conectada.

MASCOTE:
- A AI.rara é a personificação da inteligência artificial da TrocAÍ. Com uma personalidade comunicativa, espontânea e bem-humorada, ela chega para dar vida à plataforma, tornando a tecnologia mais próxima, acessível e presente na jornada dos alunos.
Mais do que uma mascote, a AI.rara atua como uma facilitadora das conexões, incentivando conversas, estimulando participações e aproximando pessoas. Sua personalidade divertida reforça o tom descontraído da marca, enquanto sua inteligência representa toda a tecnologia que movimenta a plataforma.
É a tecnologia ganhando voz, personalidade e um jeito próprio de conectar pessoas.
`

// Rota inicial
app.get('/', (req, res) => {
  res.send('IA.Rara Backend está funcionando!')
})

// Rota de conversação
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body

    // Validação da mensagem
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'A mensagem não pode estar vazia.'
      })
    }

    // Validação do histórico
    if (!Array.isArray(history)) {
      return res.status(400).json({
        error: 'O histórico precisa ser uma lista válida.'
      })
    }

    if (history.length > 50) {
      return res.status(400).json({
        error: 'O histórico da conversa excedeu o limite permitido.'
      })
    }

    const validHistory = history.every((item) =>
      item &&
      ['user', 'model'].includes(item.role) &&
      typeof item.text === 'string' &&
      item.text.trim().length > 0
    )

    if (!validHistory) {
      return res.status(400).json({
        error: 'O histórico da conversa possui dados inválidos.'
      })
    }

    // Data e horário atuais
    const currentDate = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    })

    // Prepara o histórico para o Gemini
    const contents = history.map((item) => ({
      role: item.role,
      parts: [{ text: item.text }]
    }))

    // Verifica se a mensagem atual já está no histórico
    const lastMessage = contents[contents.length - 1]

    if (
      !lastMessage ||
      lastMessage.role !== 'user' ||
      lastMessage.parts[0].text !== message
    ) {
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      })
    }

    // Adiciona data e horário à mensagem atual
    const currentMessage = contents[contents.length - 1]

    currentMessage.parts[0].text =
      `Data e horário atuais: ${currentDate}\n\n` +
      currentMessage.parts[0].text

    // Envia o histórico completo ao Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction
      }
    })

    // Verifica se houve resposta
    if (!response.text) {
      throw new Error('O Gemini não retornou uma resposta.')
    }

    // Retorna a resposta ao frontend
    res.json({
      reply: response.text
    })

  } catch (error) {
    console.error('Erro no Gemini:', error.message)

    res.status(500).json({
      error: 'Não foi possível gerar uma resposta. Tente novamente.'
    })
  }
})

// Inicialização do servidor
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`ChatGPT do PARAGUAI rodando na porta ${PORT}`)
})