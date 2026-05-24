// import { useState, useEffect } from 'react'
// import { ManualCardRow } from '../CreateDeckModal/ManualCardRow'
// import { makeCard } from '../../utils/flashcard.utils'
// import { cursoService } from '@/features/cursos/services/cursoService'
// import { CursoDropdown } from './CursoDropdown'
// import { AddCursoModal } from './AddCursoModal'
// import type { Deck, ManualCard } from '../../types/flashcard.types'
// import type { Curso } from '@/features/cursos/types/curso.types'

// interface EditDeckModalProps {
//     deck: Deck
//     onClose: () => void
//     onSave: (deck: Deck) => void
// }

// export function EditDeckModal({ deck, onClose, onSave }: EditDeckModalProps) {
//     const [courseName, setCourseName] = useState(deck.courseName)
//     const [cards, setCards] = useState<ManualCard[]>(
//         deck.cards.length > 0 ? deck.cards : [makeCard(), makeCard()]
//     )
//     const [cursos, setCursos] = useState<Curso[]>([])
//     const [dropdownOpen, setDropdownOpen] = useState(false)
//     const [showAddCurso, setShowAddCurso] = useState(false)
//     const [newCursoName, setNewCursoName] = useState('')
//     const [isPending, setIsPending] = useState(false)

//     useEffect(() => {
//         // TODO: reemplazar con cursoService.getCursos()
//         setCursos([
//             { id: 1, nombre: 'Estadística' },
//             { id: 2, nombre: 'Historia del Perú' },
//             { id: 3, nombre: 'Cálculo Diferencial' },
//             { id: 4, nombre: 'Biología Celular' },
//         ])
//     }, [])

//     const handleCreateCurso = async () => {
//         if (!newCursoName.trim() || isPending) return
//         setIsPending(true)
//         try {
//             const curso = await cursoService.createCurso(newCursoName.trim())
//             setCursos((prev) => [...prev, curso])
//             setCourseName(curso.nombre)
//             setShowAddCurso(false)
//             setNewCursoName('')
//         } finally {
//             setIsPending(false)
//         }
//     }

//     const addCard = () => setCards((c) => [...c, makeCard()])
//     const deleteCard = (id: string) => setCards((c) => c.filter((card) => card.id !== id))
//     const updateCard = (id: string, field: 'question' | 'answer', value: string) =>
//         setCards((c) => c.map((card) => card.id === id ? { ...card, [field]: value } : card))
//     const handleSave = () => onSave({ ...deck, courseName, cards, cardCount: cards.length })

//     return (
//         <>
//             <div
//                 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
//                 onClick={(e) => e.target === e.currentTarget && onClose()}
//             >
//                 <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-black/40 flex flex-col max-h-[90vh]">

//                     <div className="flex items-center justify-between px-6 py-6 flex-shrink-0">
//                         <div className="flex flex-col">
//                             <div className="flex items-center gap-2">
//                                 <h2 className="font-semibold text-accent">Editar mazo</h2>
//                                 <p className="text-muted text-xs font-mono">{cards.length} tarjetas</p>
//                             </div>
//                             <h1 className="text-2xl text-black font-bold mt-4">{deck.courseName}</h1>
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
//                             aria-label="Cerrar"
//                         >
//                             <i className="ti ti-x text-[18px]" aria-hidden="true" />
//                         </button>
//                     </div>

//                     <div className="flex-1 overflow-y-auto px-6 py-0 space-y-5">
//                         <CursoDropdown
//                             cursos={cursos}
//                             value={courseName}
//                             onChange={(nombre) => { setCourseName(nombre); setDropdownOpen(false) }}
//                             onAgregar={() => { setDropdownOpen(false); setShowAddCurso(true) }}
//                             open={dropdownOpen}
//                             onToggle={() => setDropdownOpen((v) => !v)}
//                         />

//                         <div className="space-y-1.5">
//                             <label className="text-xs font-medium text-muted">Tarjetas</label>
//                             <div className="bg-surface rounded-xl space-y-4">
//                                 {cards.map((card, i) => (
//                                     <ManualCardRow
//                                         key={card.id}
//                                         card={card}
//                                         index={i}
//                                         onChange={updateCard}
//                                         onDelete={deleteCard}
//                                         canDelete={cards.length > 1}
//                                     />
//                                 ))}
//                                 <div className="flex items-center justify-between pt-1">
//                                     <button
//                                         type="button"
//                                         onClick={addCard}
//                                         className="flex items-center gap-2 text-sm text-muted hover:text-text border border-dashed border-border rounded-lg px-3 py-2 transition-colors"
//                                     >
//                                         <i className="ti ti-plus text-[15px]" aria-hidden="true" />
//                                         Agregar tarjeta
//                                     </button>
//                                     <span className="text-xs text-muted font-mono">{cards.length} tarjetas</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-end gap-3 px-6 py-4  flex-shrink-0">
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 text-sm text-muted hover:text-text  rounded-xl hover:bg-white/5 transition-colors"
//                         >
//                             Cancelar
//                         </button>
//                         <button
//                             onClick={handleSave}
//                             className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors shadow-lg shadow-accent/20"
//                         >
//                             Guardar cambios
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {showAddCurso && (
//                 <AddCursoModal
//                     value={newCursoName}
//                     onChange={setNewCursoName}
//                     onSave={handleCreateCurso}
//                     onClose={() => { setShowAddCurso(false); setNewCursoName('') }}
//                     isPending={isPending}
//                 />
//             )}
//         </>
//     )
// }