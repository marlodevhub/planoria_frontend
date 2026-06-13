import { useState } from 'react'
import { useUploadFile } from '../hooks/upload/useUploadFile'
import { useDecks } from '../hooks/deck'
import { DeckCard } from '../components/DeckCard/DeckCard'
import { CreateDeckModal } from '../components/CreateDeckModal/CreateDeckModal'
import type { Deck } from '../types/flashcard.types'

export function FlashcardsPage() {
    const { data: decks = [], isLoading, isError } = useDecks()
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile()
    const [showCreate, setShowCreate] = useState(false)

    const handleCreate = (file: File | null) => {
        if (!file) {
            alert('Selecciona un archivo primero.')
            return
        }

        uploadFile(file, {
            onSuccess: () => setShowCreate(false),
        })
    }

    if (isLoading) return <p className="text-muted">Cargando mazos...</p>
    if (isError) return <p className="text-red-500">Error cargando mazos. Intenta recargar la página.</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text">Mis flashcards</h1>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent/90 transition-colors"
                >
                    <i className="ti ti-plus text-[15px]" aria-hidden="true" />
                    Nuevo mazo
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks.map((deck) => (
                    <DeckCard key={deck.idArchivo} deck={deck} />
                ))}
            </div>

            {showCreate && (
                <CreateDeckModal
                    onClose={() => setShowCreate(false)}
                    onSubmit={handleCreate}
                    isLoading={isUploading}
                />
            )}
        </div>
    )
}