import { Card } from '@/components/ui/Card'

export function FlashcardsPage() {
    return (
        <div className="space-y-6 animate-fade-up">
            <div>
                <h1 className="text-2xl font-bold text-text">Flashcards</h1>
                <p className="text-muted text-sm mt-1">Estudia con tarjetas de memoria</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Matemáticas', 'Historia', 'Ciencias', 'Inglés', 'Geografía', 'Física'].map((deck) => (
                    <Card key={deck} className="hover:border-accent/50 cursor-pointer group">
                        <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                            <i className="ti ti-cards text-accent text-[20px]" aria-hidden="true" />
                        </div>
                        <p className="font-semibold text-text">{deck}</p>
                        <p className="text-muted text-xs font-mono mt-1">24 tarjetas</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}