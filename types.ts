
export interface Project {
  id: string;
  title: string;
  category: 'VLSI' | 'Software' | 'Writing';
  description: string;
  tags: string[];
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export enum Discipline {
  VLSI = 'VLSI Engineering',
  Software = 'Software Development',
  Athletics = 'Athletics',
  Writing = 'Creative Writing'
}
