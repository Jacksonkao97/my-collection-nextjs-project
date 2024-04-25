import { v4 as uuidv4 } from 'uuid';

export const suggestionsSeed = [
  {
    id: uuidv4(),
    title: 'The Best Way to Learn React',
    image: 'https://picsum.photos/200/300',
    url: 'https://reactjs.org/',
    date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'The Best Way to Learn Next.js',
    image: 'https://picsum.photos/200/400',
    url: 'https://nextjs.org/',
    date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'The Best Way to Learn Tailwind CSS',
    image: 'https://picsum.photos/200/600',
    url: 'https://tailwindcss.com/',
    date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'The Best Way to Learn Prisma',
    image: 'https://picsum.photos/200/700',
    url: 'https://www.prisma.io/',
    date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'The Best Way to Learn TypeScript',
    image: 'https://picsum.photos/200/500',
    url: 'https://www.typescriptlang.org/',
    date: new Date().toISOString()
  }
]