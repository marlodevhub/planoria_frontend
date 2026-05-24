import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { MethodSelector } from './MethodSelector'
import { DifficultySelector } from './DifficultySelector'
import { ManualCardRow } from './ManualCardRow'
import type { CreateDeckForm, DeckMethod, Difficulty, ManualCard } from '../../types/flashcard.types'

const makeCard = (): ManualCard => ({
    id: crypto.randomUUID(),
    question: '',
    answer: '',
})

const defaultForm = (): CreateDeckForm => ({
    courseName: '',
    title: '',
    method: 'manual',
    difficulty: null,
    topic: '',
    cardCount: 12,
    file: null,
    manualCards: [makeCard(), makeCard()],
})

interface CreateDeckModalProps {
    onClose: () => void
    onSubmit: (form: CreateDeckForm) => void
    isLoading?: boolean  // ← nuevo
}

const inputCls = 'w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors'
const sectionCls = 'bg-surface border border-border rounded-xl p-4 space-y-4'

export function CreateDeckModal({ onClose, onSubmit, isLoading }: CreateDeckModalProps) {
    const [form, setForm] = useState<CreateDeckForm>(defaultForm)
    const fileRef = useRef<HTMLInputElement>(null)

    const set = <K extends keyof CreateDeckForm>(key: K, val: CreateDeckForm[K]) =>
        setForm((f) => ({ ...f, [key]: val }))

    const addCard = () => set('manualCards', [...form.manualCards, makeCard()])

    const deleteCard = (id: string) =>
        set('manualCards', form.manualCards.filter((c) => c.id !== id))

    const updateCard = (id: string, field: 'question' | 'answer', value: string) =>
        set('manualCards', form.manualCards.map((c) => c.id === id ? { ...c, [field]: value } : c))


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-black/40 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <h2 className="font-semibold text-text">Nuevo mazo de flashcards</h2>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
                        aria-label="Cerrar"
                    >
                        <i className="ti ti-x text-[18px]" aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                    {/* Nombre del curso */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted">Nombre del curso</label>
                        <input
                            type="text"
                            value={form.courseName}
                            onChange={(e) => set('courseName', e.target.value)}
                            placeholder="Ej: Estadística, Historia..."
                            className={inputCls}
                        />
                    </div>

                    {/* Método */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted">Método de creación</label>
                        <MethodSelector
                            value={form.method}
                            onChange={(m: DeckMethod) => set('method', m)}
                        />
                    </div>

                    {/* Por tema */}
                    {form.method === 'tema' && (
                        <div className={sectionCls}>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted">Tema a estudiar</label>
                                <input
                                    type="text"
                                    value={form.topic}
                                    onChange={(e) => set('topic', e.target.value)}
                                    placeholder="Ej: Teorema de Bayes, derivadas..."
                                    className={inputCls}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted">Dificultad</label>
                                <DifficultySelector
                                    value={form.difficulty}
                                    onChange={(d: Difficulty) => set('difficulty', d)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted">Cantidad de tarjetas</label>
                                <input
                                    type="number"
                                    min={1} max={50}
                                    value={form.cardCount}
                                    onChange={(e) => set('cardCount', Number(e.target.value))}
                                    className={cn(inputCls, 'w-24')}
                                />
                            </div>
                        </div>
                    )}

                    {/* Por archivo */}
                    {form.method === 'archivo' && (
                        <div className={sectionCls} >
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="w-full  border border-dashed border-border rounded-xl py-6 flex flex-col items-center gap-2 text-muted hover:border-accent/50 hover:text-text transition-colors"
                            >
                                <i className="ti ti-cloud-upload text-[28px]" aria-hidden="true" />
                                <p className="text-sm">
                                    {form.file ? form.file.name : 'Arrastra o haz clic para subir'}
                                </p>
                                <span className="text-xs">PDF, TXT — máx. 5 MB</span>
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf,.docx,.txt"
                                className="hidden "
                                onChange={(e) => set('file', e.target.files?.[0] ?? null)}
                            />
                            <div className="space-y-1.5 ">
                                <label className="text-xs font-medium text-muted">Dificultad</label>
                                <DifficultySelector
                                    value={form.difficulty}
                                    onChange={(d: Difficulty) => set('difficulty', d)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted">Cantidad de tarjetas</label>
                                <input
                                    type="number"
                                    min={1} max={50}
                                    value={form.cardCount}
                                    onChange={(e) => set('cardCount', Number(e.target.value))}
                                    className={cn(inputCls, 'w-24')}
                                />
                            </div>
                        </div>
                    )}

                    {/* Manual */}
                    {form.method === 'manual' && (
                        <div className={sectionCls}>
                            <div className="space-y-3">
                                {form.manualCards.map((card, i) => (
                                    <ManualCardRow
                                        key={card.id}
                                        card={card}
                                        index={i}
                                        onChange={updateCard}
                                        onDelete={deleteCard}
                                        canDelete={form.manualCards.length > 1}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <button
                                    type="button"
                                    onClick={addCard}
                                    className="flex items-center gap-2 text-sm text-muted hover:text-text rounded-lg px-3 py-2 transition-colors"
                                >
                                    <i className="ti ti-plus text-[15px]" aria-hidden="true" />
                                    Agregar tarjeta
                                </button>
                                <span className="text-xs text-muted font-mono">
                                    {form.manualCards.length} tarjetas
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4  flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted hover:text-text  rounded-xl hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={() => onSubmit(form)}
                        disabled={isLoading}
                        className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Procesando con IA...' : 'Crear mazo'}
                    </button>
                </div>
            </div>
        </div>
    )
}