import {
    Briefcase,
    MoonStars,
    GameController,
    Coffee,
    GraduationCap,
    Baby,
    Headphones,
    BookOpen,
    MusicNotes
} from '@phosphor-icons/react'

// AVATARES
import umImg from '../assets/avatars/1.png'
import doisImg from '../assets/avatars/2.png'
import tresImg from '../assets/avatars/3.png'
import quatroImg from '../assets/avatars/4.png'
import cincoImg from '../assets/avatars/5.png'
import seisImg from '../assets/avatars/6.png'
import seteImg from '../assets/avatars/7.png'
import oitoImg from '../assets/avatars/8.png'

const avatares = [
    umImg,
    doisImg,
    tresImg,
    quatroImg,
    cincoImg,
    seisImg,
    seteImg,
    oitoImg
]

const nomesParticipantes = [
    'Você',
    'Marina',
    'Rafael',
    'Júlia',
    'Tiago',
    'Caio',
    'Ronaldo',
    'Pedro',
    'Beatriz'
]

// Cria a lista de participantes de acordo com o total da sala
function criarParticipantes(total) {
    return Array.from({ length: total }, (_, index) => ({
        id: index + 1,
        nome: nomesParticipantes[index],
        avatar: avatares[index % avatares.length],
        online: true
    }))
}

export const salasPorInteresse = {
    'Trabalho e estudo': {
        id: 'equilibrio-em-foco',
        nome: 'equilibrio-em-foco',
        titulo: 'Equilíbrio em Foco',
        detalhe: 'Trabalho e estudo',
        hashtag: '#equilibrio-em-foco',
        tag: '#TrabalhoEEstudo',
        icone: Briefcase,
        participantes: criarParticipantes(9),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Hoje estou tentando organizar melhor meus horários entre trabalho e faculdade.',
                horario: '09:12'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Uma coisa que me ajuda é separar pequenas metas para cada dia.',
                horario: '09:15'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Eu precisava aprender a fazer isso! Sempre acabo deixando tudo para depois.',
                horario: '09:17'
            },
            {
                id: 4,
                autor: 'Tiago',
                texto: 'Também passo por isso. O segredo é tentar não abraçar tudo de uma vez.',
                horario: '09:20'
            }
        ],
        perguntas: [
            'Como você organiza sua rotina entre trabalho e estudos?',
            'Qual é o maior desafio de conciliar tantas responsabilidades?',
            'O que você faz para descansar depois de um dia cheio?',
            'Qual hábito gostaria de incluir na sua rotina?',
            'Você prefere estudar de manhã, à tarde ou à noite?',
            'Qual dica de organização você daria para alguém?'
        ]
    },

    'Estudo de madrugada': {
        id: 'corujas-da-madrugada',
        nome: 'corujas-da-madrugada',
        titulo: 'Corujas da Madrugada',
        detalhe: 'Estudo de madrugada',
        hashtag: '#corujas-da-madrugada',
        tag: '#EstudoDeMadrugada',
        icone: MoonStars,
        participantes: criarParticipantes(4),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Mais alguém começando a estudar agora ou só eu que funciono depois da meia-noite?',
                horario: '00:18'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Por aqui também! A casa fica silenciosa e parece que finalmente consigo focar.',
                horario: '00:21'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Só não podemos esquecer de dormir depois, né? Haha.',
                horario: '00:24'
            }
        ],
        perguntas: [
            'O que faz você preferir estudar durante a madrugada?',
            'Qual é o seu lanche favorito para acompanhar os estudos?',
            'Você consegue manter uma rotina de sono estudando à noite?',
            'Qual matéria costuma prender sua atenção por horas?',
            'Você prefere silêncio ou música para estudar?',
            'Qual foi a madrugada mais produtiva que já teve?'
        ]
    },

    'Jogos indie': {
        id: 'indieverso',
        nome: 'indieverso',
        titulo: 'Indieverso',
        detalhe: 'Jogos indie',
        hashtag: '#indieverso',
        tag: '#JogosIndie',
        icone: GameController,
        participantes: criarParticipantes(6),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Terminei um jogo indie ontem e fiquei pensando nele o dia inteiro.',
                horario: '14:03'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Qual era? Adoro quando um jogo pequeno consegue contar uma história incrível.',
                horario: '14:06'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Estou procurando recomendações novas. Já enjoei dos jogos que tenho aqui.',
                horario: '14:08'
            },
            {
                id: 4,
                autor: 'Tiago',
                texto: 'Jogos de exploração e pixel art sempre ganham minha atenção.',
                horario: '14:11'
            }
        ],
        perguntas: [
            'Qual jogo indie você recomendaria para todo mundo?',
            'Você prefere jogos com foco em história ou gameplay?',
            'Qual jogo marcou sua infância?',
            'Que estilo de jogo você gostaria de experimentar?',
            'Qual trilha sonora de jogo você mais gosta?',
            'Se pudesse criar um jogo, sobre o que seria?'
        ]
    },

    'Café e code': {
        id: 'cafe-e-code',
        nome: 'cafe-e-code',
        titulo: 'Clube do Café e Código',
        detalhe: 'Café e code',
        hashtag: '#clube-do-cafe-e-codigo',
        tag: '#CaféECódigo',
        icone: Coffee,
        participantes: criarParticipantes(8),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Terceiro café do dia e ainda é manhã. Alguém mais?',
                horario: '10:02'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Eu já perdi a conta. Mas acabei de achar um grão torrado clarinho que é muito bom.',
                horario: '10:04'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Me passa o nome! Estou testando um jogo indie de cozinhar, combina com café.',
                horario: '10:06'
            },
            {
                id: 4,
                autor: 'Tiago',
                texto: 'Haha, qual jogo? Eu estou viciado em um de montar cidadezinhas.',
                horario: '10:07'
            }
        ],
        perguntas: [
            'Qual jogo, hobby ou atividade aleatória prende sua atenção?',
            'Qual foi a última coisa que fez você rir bastante?',
            'Se pudesse aprender uma habilidade instantaneamente, qual seria?',
            'Qual música você não consegue parar de ouvir?',
            'Qual lugar você gostaria de conhecer?',
            'Qual jogo você recomendaria para todo mundo experimentar?'
        ]
    },

    'Primeira graduação': {
        id: 'primeiros-passos',
        nome: 'primeiros-passos',
        titulo: 'Primeiros Passos',
        detalhe: 'Primeira graduação',
        hashtag: '#primeiros-passos',
        tag: '#PrimeiraGraduação',
        icone: GraduationCap,
        participantes: criarParticipantes(5),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Alguém mais ainda está tentando entender como funciona a vida universitária?',
                horario: '11:02'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'No começo eu me perdia até para encontrar as salas. Agora já estou quase especialista haha.',
                horario: '11:05'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Acho que trocar experiências ajuda bastante. Todo mundo está aprendendo.',
                horario: '11:08'
            }
        ],
        perguntas: [
            'O que fez você escolher seu curso?',
            'Qual foi sua maior surpresa ao entrar na faculdade?',
            'O que você gostaria de saber antes de começar a graduação?',
            'Qual disciplina está sendo sua favorita?',
            'Como você costuma lidar com trabalhos em grupo?',
            'O que espera conquistar durante a graduação?'
        ]
    },

    'Mãe e estudante': {
        id: 'maes-em-conexao',
        nome: 'maes-em-conexao',
        titulo: 'Mães em Conexão',
        detalhe: 'Mãe e estudante',
        hashtag: '#maes-em-conexao',
        tag: '#MãeEEstudante',
        icone: Baby,
        participantes: criarParticipantes(3),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Consegui terminar uma atividade enquanto meu pequeno tirava uma soneca. Pequenas vitórias!',
                horario: '13:10'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Cada tempinho livre conta, né? Às vezes é difícil encaixar tudo.',
                horario: '13:14'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'É muito bom ter um espaço para conversar com quem entende essa rotina.',
                horario: '13:17'
            }
        ],
        perguntas: [
            'Qual é o seu maior desafio ao conciliar maternidade e estudos?',
            'Como você aproveita os pequenos intervalos para estudar?',
            'O que te motiva a continuar sua graduação?',
            'Você tem alguma dica de organização que funciona na sua rotina?',
            'Qual conquista acadêmica te deixou mais orgulhosa?',
            'Como você gosta de aproveitar seu tempo livre?'
        ]
    },

    Podcasts: {
        id: 'entre-episodios',
        nome: 'entre-episodios',
        titulo: 'Entre Episódios',
        detalhe: 'Podcasts',
        hashtag: '#entre-episodios',
        tag: '#Podcasts',
        icone: Headphones,
        participantes: criarParticipantes(7),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Preciso de um podcast novo para ouvir no caminho da faculdade.',
                horario: '08:30'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Tenho uma lista enorme! Vocês preferem entrevistas, histórias ou conteúdo educativo?',
                horario: '08:34'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Gosto muito de histórias reais e episódios que fazem pensar.',
                horario: '08:37'
            }
        ],
        perguntas: [
            'Qual podcast você não perde um episódio?',
            'Você prefere podcasts curtos ou conversas longas?',
            'Qual assunto poderia ouvir por horas?',
            'Tem algum episódio que mudou sua forma de pensar?',
            'Você costuma ouvir podcasts enquanto faz outras atividades?',
            'Se criasse um podcast, qual seria o tema?'
        ]
    },

    Leitura: {
        id: 'clube-do-capitulo',
        nome: 'clube-do-capitulo',
        titulo: 'Clube do Capítulo',
        detalhe: 'Leitura',
        hashtag: '#clube-do-capitulo',
        tag: '#Leitura',
        icone: BookOpen,
        participantes: criarParticipantes(8),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Comecei um livro ontem e já estou quase na metade. Não consegui parar!',
                horario: '16:02'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Qual é? Estou procurando uma leitura nova para este mês.',
                horario: '16:05'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Eu adoro quando a história prende tanto que a gente perde a noção do tempo.',
                horario: '16:08'
            }
        ],
        perguntas: [
            'Qual livro você recomendaria sem pensar duas vezes?',
            'Você prefere livros físicos ou digitais?',
            'Qual personagem literário ficou na sua memória?',
            'Que gênero literário você mais gosta?',
            'Qual livro gostaria de ler pela primeira vez novamente?',
            'Você costuma abandonar livros ou sempre termina?'
        ]
    },

    Música: {
        id: 'sintonia',
        nome: 'sintonia',
        titulo: 'Sintonia',
        detalhe: 'Música',
        hashtag: '#sintonia',
        tag: '#Música',
        icone: MusicNotes,
        participantes: criarParticipantes(5),
        mensagens: [
            {
                id: 1,
                autor: 'Marina',
                texto: 'Estou montando uma playlist nova para estudar. Aceito sugestões!',
                horario: '15:20'
            },
            {
                id: 2,
                autor: 'Rafael',
                texto: 'Para estudar eu gosto de lo-fi, mas para qualquer outra coisa vai de rock.',
                horario: '15:23'
            },
            {
                id: 3,
                autor: 'Júlia',
                texto: 'Minha playlist é uma mistura completamente aleatória de estilos haha.',
                horario: '15:26'
            }
        ],
        perguntas: [
            'Qual música você está ouvindo no repeat?',
            'Que artista você gostaria de ver ao vivo?',
            'Você costuma ouvir música enquanto estuda?',
            'Qual música sempre melhora seu humor?',
            'Que estilo musical você gostaria de conhecer melhor?',
            'Qual foi o melhor show a que já assistiu?'
        ]
    }
}

// Lista de interesses gerada automaticamente a partir das salas
export const interesses = Object.keys(salasPorInteresse)

// Retorna o número de pessoas online com base na lista de participantes
export function obterTotalOnline(sala) {
    return sala.participantes.length
}
