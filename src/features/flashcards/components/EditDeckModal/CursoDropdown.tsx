// import { useRef, useEffect } from 'react'
// import type { Curso } from '@/features/cursos/types/curso.types'

// interface CursoDropdownProps {
//     cursos: Curso[]
//     value: string
//     onChange: (nombre: string) => void
//     onAgregar: () => void
//     open: boolean
//     onToggle: () => void
// }

// export function CursoDropdown({ cursos, value, onChange, onAgregar, open, onToggle }: CursoDropdownProps) {
//     const ref = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const handler = (e: MouseEvent) => {
//             if (ref.current && !ref.current.contains(e.target as Node)) {
//                 if (open) onToggle()
//             }
//         }
//         document.addEventListener('mousedown', handler)
//         return () => document.removeEventListener('mousedown', handler)
//     }, [open, onToggle])

//     return (
//         <div className="space-y-1.5">
//             <label className="text-xs font-medium text-muted">Nombre del curso</label>
//             <div className="relative" ref={ref}>
//                 <button
//                     type="button"
//                     onClick={onToggle}
//                     className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-left flex items-center justify-between border border-border focus:outline-none focus:border-accent/60 transition-colors"
//                 >
//                     <span className={value ? 'text-text' : 'text-muted'}>
//                         {value || 'Selecciona un curso'}
//                     </span>
//                     <i
//                         className={`ti ti-chevron-down text-[15px] text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
//                         aria-hidden="true"
//                     />
//                 </button>

//                 {open && (
//                     <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden">
//                         <div className="max-h-48 overflow-y-auto">
//                             {cursos.length === 0 && (
//                                 <p className="px-4 py-2.5 text-sm text-muted">Sin cursos aún</p>
//                             )}
//                             {cursos.map((c) => (
//                                 <button
//                                     key={c.id}
//                                     type="button"
//                                     onClick={() => onChange(c.nombre)}
//                                     className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 transition-colors flex items-center justify-between
//                                         ${value === c.nombre ? 'text-accent font-medium' : 'text-text'}`}
//                                 >
//                                     {c.nombre}
//                                     {value === c.nombre && (
//                                         <i className="ti ti-check text-[14px] text-accent" aria-hidden="true" />
//                                     )}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="border-t border-border">
//                             <button
//                                 type="button"
//                                 onClick={onAgregar}
//                                 className="w-full text-left px-4 py-2.5 text-sm text-accent hover:bg-accent/5 transition-colors flex items-center gap-2"
//                             >
//                                 <i className="ti ti-plus text-[15px]" aria-hidden="true" />
//                                 Agregar curso
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }