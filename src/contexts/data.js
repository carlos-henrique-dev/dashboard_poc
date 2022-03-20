import { v4 as uuidv4 } from 'uuid'

export const DEFAULT_AGENTS = [
  {
    key: '1',
    name: 'R2-D2',
    description: 'Robozin das galaxia',
    image: '/agents/r2-d2.png',
    intents: [
      {
        key: uuidv4(),
        name: 'PEDIR_COMIDA',
        description: 'O usuário quer pedir comida',
      },
    ],
    dialogs: [
      {
        key: uuidv4(),
        title: 'Bem vindo',
      },
      {
        key: uuidv4(),
        title: 'Sobre',
        children: [
          {
            title: 'Olá',
            key: uuidv4(),
          },
          {
            title: 'Tudo bem?',
            key: uuidv4(),
          },
        ],
      },
      {
        key: uuidv4(),
        title: 'Comida',
        children: [
          {
            title: 'Estou com fome',
            key: uuidv4(),
            children: [
              {
                title: 'Fome de comida de verdade',
                key: uuidv4(),
              },
              {
                title: 'Fome de lanche',
                key: uuidv4(),
              },
            ],
          },
          {
            title: 'Quero pizza',
            key: uuidv4(),
          },
        ],
      },
    ],
    entities: [
      {
        key: uuidv4(),
        name: '@comida',
        describe: 'Entidade comida',
      },
    ],
  },
  {
    key: '2',
    name: 'Bumblebee',
    description: 'Melhor transformer',
    image: '/agents/bumblebee.jpg',
    intents: [],
    dialogs: [],
    entities: [],
  },
]
