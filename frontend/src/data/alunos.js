
import avatarUm from '../assets/avatars/1.png'
import avatarDois from '../assets/avatars/2.png'
import avatarTres from '../assets/avatars/3.png'
import avatarQuatro from '../assets/avatars/4.png'
import avatarCinco from '../assets/avatars/5.png'
import avatarSeis from '../assets/avatars/6.png'
import avatarSete from '../assets/avatars/7.png'
import avatarOito from '../assets/avatars/8.png'
import avatarNove from '../assets/avatars/9.png'
import avatarDez from '../assets/avatars/10.png'
import avatarOnze from '../assets/avatars/11.png'
import avatarDoze from '../assets/avatars/12.png'
import avatarTreze from '../assets/avatars/13.png'
import avatarQuatorze from '../assets/avatars/14.png'
import avatarQuinze from '../assets/avatars/15.png'
import avatarDezesseis from '../assets/avatars/16.png'

const avataresPadrao = [
    avatarUm,
    avatarDois,
    avatarTres,
    avatarQuatro,
    avatarCinco,
    avatarSeis,
    avatarSete,
    avatarOito
]

const avataresFiap = [
    avatarNove,
    avatarDez,
    avatarOnze,
    avatarDoze,
    avatarTreze,
    avatarQuatorze,
    avatarQuinze,
    avatarDezesseis
]

const alunos = [
    {
        id: 'gabriel',
        apelido: 'Gabi',
        nomeCompleto: 'Gabriel Oliveira Martins',
        avatarIndex: 0,
        bio: 'Gosto de tecnologia, jogos e música. Estou sempre procurando aprender algo novo e conhecer pessoas com interesses parecidos.',
        interesses: ['#JogosIndie', '#Música', '#CaféECódigo']
    },
    {
        id: 'marina',
        apelido: 'Mari',
        nomeCompleto: 'Marina Costa Ferreira',
        avatarIndex: 1,
        bio: 'Estudante apaixonada por design, leitura e criatividade. Adoro trocar referências e descobrir coisas novas.',
        interesses: ['#Leitura', '#Podcasts', '#TrabalhoEEstudo']
    },
    {
        id: 'rafael',
        apelido: 'Rafa',
        nomeCompleto: 'Rafael Mendes Carvalho',
        avatarIndex: 2,
        bio: 'Gosto de programação, café e conversas sobre tecnologia. Geralmente estudo melhor à noite.',
        interesses: ['#CaféECódigo', '#EstudoDeMadrugada', '#JogosIndie']
    },
    {
        id: 'julia',
        apelido: 'Júlia',
        nomeCompleto: 'Júlia Santos Almeida',
        avatarIndex: 3,
        bio: 'Curto música, podcasts e conhecer pessoas novas. Acredito que estudar em grupo deixa tudo mais leve.',
        interesses: ['#Música', '#Podcasts', '#PrimeiraGraduação']
    },
    {
        id: 'tiago',
        apelido: 'Ti',
        nomeCompleto: 'Tiago Almeida Ribeiro',
        avatarIndex: 4,
        bio: 'Sou curioso por tecnologia e gosto de aprender na prática. Nos finais de semana, costumo jogar e assistir séries.',
        interesses: ['#JogosIndie', '#TrabalhoEEstudo', '#Música']
    },
    {
        id: 'beatriz',
        apelido: 'Bia',
        nomeCompleto: 'Ana Beatriz Souza Almeida',
        avatarIndex: 5,
        bio: 'Gosto de livros, ilustração e conversas sobre criatividade. Sempre tenho alguma recomendação de leitura.',
        interesses: ['#Leitura', '#Podcasts', '#PrimeiraGraduação']
    },
    {
        id: 'caio',
        apelido: 'Caio',
        nomeCompleto: 'Caio Ferreira Santos',
        avatarIndex: 6,
        bio: 'Estudo melhor de madrugada e gosto de trocar ideias sobre programação e desenvolvimento de jogos.',
        interesses: ['#EstudoDeMadrugada', '#JogosIndie', '#CaféECódigo']
    },
    {
        id: 'larissa',
        apelido: 'Lari',
        nomeCompleto: 'Larissa Rocha Mendes',
        avatarIndex: 7,
        bio: 'Amo música, filmes e descobrir novos lugares para tomar café. Estou sempre aberta a novas amizades.',
        interesses: ['#Música', '#CaféECódigo', '#Podcasts']
    },
    {
        id: 'pedro',
        apelido: 'Pedro',
        nomeCompleto: 'Pedro Martins Oliveira',
        avatarIndex: 0,
        bio: 'Gosto de tecnologia, futebol e jogos. Estou tentando manter uma rotina de estudos mais organizada.',
        interesses: ['#TrabalhoEEstudo', '#JogosIndie', '#EstudoDeMadrugada']
    },
    {
        id: 'camila',
        apelido: 'Cami',
        nomeCompleto: 'Camila Souza Ribeiro',
        avatarIndex: 1,
        bio: 'Sou apaixonada por fotografia, arte e leitura. Adoro conhecer pessoas com interesses diferentes dos meus.',
        interesses: ['#Leitura', '#Música', '#PrimeiraGraduação']
    },
    {
        id: 'lucas',
        apelido: 'Lu',
        nomeCompleto: 'Lucas Ribeiro Costa',
        avatarIndex: 2,
        bio: 'Curto programação, tecnologia e café. Estou sempre buscando projetos novos para colocar em prática.',
        interesses: ['#CaféECódigo', '#TrabalhoEEstudo', '#JogosIndie']
    },
    {
        id: 'ana',
        apelido: 'Aninha',
        nomeCompleto: 'Ana Clara Mendes Oliveira',
        avatarIndex: 3,
        bio: 'Gosto de podcasts, livros e aprender coisas novas. Minha rotina é corrida, mas sempre encontro um tempinho para conversar.',
        interesses: ['#Podcasts', '#Leitura', '#Música']
    },
    {
        id: 'bruno',
        apelido: 'Bru',
        nomeCompleto: 'Bruno Carvalho Santos',
        avatarIndex: 4,
        bio: 'Sou fã de jogos indie e tecnologia. Gosto de conhecer projetos criativos e compartilhar dicas.',
        interesses: ['#JogosIndie', '#CaféECódigo', '#EstudoDeMadrugada']
    },
    {
        id: 'isabela',
        apelido: 'Isa',
        nomeCompleto: 'Isabela Costa Ferreira',
        avatarIndex: 5,
        bio: 'Gosto de música, arte e organização. Estou sempre procurando formas mais leves de estudar.',
        interesses: ['#Música', '#TrabalhoEEstudo', '#PrimeiraGraduação']
    },
    {
        id: 'enzo',
        apelido: 'Enzo',
        nomeCompleto: 'Enzo Oliveira Martins',
        avatarIndex: 6,
        bio: 'Curto tecnologia e cultura pop. Meu horário favorito para estudar é à noite.',
        interesses: ['#EstudoDeMadrugada', '#JogosIndie', '#Podcasts']
    },
    {
        id: 'sofia',
        apelido: 'Sofi',
        nomeCompleto: 'Sofia Almeida Ribeiro',
        avatarIndex: 7,
        bio: 'Leitura, café e boas conversas são minhas combinações favoritas. Adoro trocar indicações de livros.',
        interesses: ['#Leitura', '#CaféECódigo', '#PrimeiraGraduação']
    },
    {
        id: 'mateus',
        apelido: 'Teus',
        nomeCompleto: 'Mateus Santos Carvalho',
        avatarIndex: 0,
        bio: 'Gosto de desenvolver projetos, ouvir música e aprender com outras pessoas.',
        interesses: ['#TrabalhoEEstudo', '#Música', '#CaféECódigo']
    },
    {
        id: 'laura',
        apelido: 'Lau',
        nomeCompleto: 'Laura Ferreira Mendes',
        avatarIndex: 1,
        bio: 'Adoro podcasts, filmes e conhecer pessoas novas. Acredito que a faculdade também é feita de boas conexões.',
        interesses: ['#Podcasts', '#Música', '#Leitura']
    },
    {
        id: 'daniel',
        apelido: 'Dani',
        nomeCompleto: 'Daniel Mendes Ribeiro',
        avatarIndex: 2,
        bio: 'Sou interessado em programação e jogos. Gosto de estudar em grupo e compartilhar conhecimento.',
        interesses: ['#JogosIndie', '#CaféECódigo', '#TrabalhoEEstudo']
    },
    {
        id: 'amanda',
        apelido: 'Mand',
        nomeCompleto: 'Amanda Ribeiro Costa',
        avatarIndex: 3,
        bio: 'Gosto de criatividade, leitura e música. Estou sempre descobrindo novos hobbies e interesses.',
        interesses: ['#Leitura', '#Música', '#PrimeiraGraduação']
    }
]

export function obterAlunosDemo(temaFiap = false) {
    const avataresDoTema = temaFiap ? avataresFiap : avataresPadrao

    return alunos.map(aluno => ({
        ...aluno,
        avatar: avataresDoTema[aluno.avatarIndex]
    }))
}


export function obterAvatarDoPerfil(avatar, temaFiap = false) {
    if (avatar?.tipo === 'personalizado') {
        return avatar.imagem
    }

    const id = Number(avatar?.id)

    if (temaFiap) {
        const indice = id >= 9 && id <= 16
            ? id - 9
            : id >= 1 && id <= 8
                ? id - 1
                : 1

        return avataresFiap[indice]
    }

    const indice = id >= 1 && id <= 8
        ? id - 1
        : id >= 9 && id <= 16
            ? id - 9
            : 1

    return avataresPadrao[indice]
}

