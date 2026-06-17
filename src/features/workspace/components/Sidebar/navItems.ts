export interface NavItem {
    key: string
    label: string
    shortLabel: string
    icon: string
    path: string
}

export const navItems: NavItem[] = [
    { key: 'home', label: 'Home', shortLabel: 'Home', icon: 'ti-home', path: '/workspace' },
    { key: 'flashcards', label: 'Flashcards', shortLabel: 'Cards', icon: 'ti-cards', path: '/workspace/flashcards' },
    { key: 'quizzes', label: 'Quizzes', shortLabel: 'Quiz', icon: 'ti-puzzle', path: '/workspace/quizzes' },
    { key: 'cronograma', label: 'Cronograma', shortLabel: 'Crono', icon: 'ti-calendar', path: '/workspace/cronograma' },
    { key: 'progreso', label: 'Progreso', shortLabel: 'Stats', icon: 'ti-chart-bar', path: '/workspace/progreso' },
    { key: 'cursos', label: 'Cursos', shortLabel: 'Cursos', icon: 'ti-book', path: '/workspace/courses' },
    { key: 'perfil', label: 'Perfil', shortLabel: 'Perfil', icon: 'ti-user', path: '/workspace/perfil' },
]