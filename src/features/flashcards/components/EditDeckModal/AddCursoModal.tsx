// interface AddCursoModalProps {
//     value: string
//     onChange: (v: string) => void
//     onSave: () => void
//     onClose: () => void
//     isPending: boolean
// }

// const inputCls = 'w-full bg-white rounded-xl px-4 py-2.5 text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent/60 transition-colors'

// export function AddCursoModal({ value, onChange, onSave, onClose, isPending }: AddCursoModalProps) {
//     return (
//         <div
//             className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
//             onClick={(e) => e.target === e.currentTarget && onClose()}
//         >
//             <div className="bg-surface border border-border rounded-2xl w-full max-w-sm shadow-2xl shadow-black/40 flex flex-col">

//                 <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
//                     <div>
//                         <h2 className="font-semibold text-text">Agregar curso</h2>
//                         <h1 className="text-2xl text-black font-bold">Nuevo curso</h1>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
//                         aria-label="Cerrar"
//                     >
//                         <i className="ti ti-x text-[18px]" aria-hidden="true" />
//                     </button>
//                 </div>

//                 <div className="px-6 py-5">
//                     <div className="space-y-1.5">
//                         <label className="text-xs font-medium text-muted">Nombre del curso</label>
//                         <input
//                             type="text"
//                             value={value}
//                             onChange={(e) => onChange(e.target.value)}
//                             onKeyDown={(e) => e.key === 'Enter' && onSave()}
//                             placeholder="Ej: Estadística, Historia..."
//                             className={inputCls}
//                             autoFocus
//                         />
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border flex-shrink-0">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 text-sm text-muted hover:text-text border border-border rounded-xl hover:bg-white/5 transition-colors"
//                     >
//                         Cancelar
//                     </button>
//                     <button
//                         onClick={onSave}
//                         disabled={!value.trim() || isPending}
//                         className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {isPending ? 'Guardando...' : 'Guardar'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }