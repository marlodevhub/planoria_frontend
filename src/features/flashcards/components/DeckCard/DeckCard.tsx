import { useNavigate } from 'react-router-dom'
import { buildRoute } from '@/app/router/routes'
import type { Deck } from '../../types/flashcard.types'

interface DeckCardProps {
    deck: Deck
}

export function DeckCard({ deck }: DeckCardProps) {
    const navigate = useNavigate()

    const handleEmpezar = () => {
        navigate(buildRoute.flashcardsStudy(String(deck.idArchivo)))
    }

    return (
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 hover:shadow-lg hover:shadow-black/10 transition-all duration-200">

            <h3 className="text-xl text-text font-bold leading-snug pr-2">
                {deck.nombreArchivo}
            </h3>

            <div className="inline-flex items-center text-[11px] font-bold">
                <span className="border border-accent-2 text-accent-2 px-2.5 py-0.5 rounded-full">
                    {deck.tipoArchivo.replace('.', '').toUpperCase()}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5">
                    <i className="ti ti-file text-[14px]" aria-hidden="true" />
                    {deck.tamanoMB} MB
                </span>
                <span className="flex items-center gap-1.5">
                    <i className="ti ti-clock text-[14px]" aria-hidden="true" />
                    {new Date(deck.fechaSubida).toLocaleDateString('es-PE')}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${deck.estado === 'PROCESADO'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                    {deck.estado}
                </span>
            </div>

            <button
                onClick={handleEmpezar}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-3xl hover:opacity-90 transition-opacity w-full"
            >
                <i className="ti ti-player-play-filled text-[14px]" aria-hidden="true" />
                Empezar
            </button>
        </div>
    )
}