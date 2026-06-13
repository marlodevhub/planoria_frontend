import { useState, useRef } from 'react'

interface CreateDeckModalProps {
    onClose: () => void
    onSubmit: (file: File | null) => void
    isLoading?: boolean
}

const uploadButtonCls = 'w-full border border-dashed border-border rounded-xl py-6 flex flex-col items-center gap-2 text-muted hover:border-accent/50 hover:text-text transition-colors'

export function CreateDeckModal({ onClose, onSubmit, isLoading = false }: CreateDeckModalProps) {
    const [file, setFile] = useState<File | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl shadow-black/40 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                    <div>
                        <h2 className="font-semibold text-text">Sube tu archivo de flashcards</h2>
                        <p className="text-sm text-muted">El backend procesará tu documento y generará el mazo automáticamente.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors"
                        aria-label="Cerrar"
                    >
                        <i className="ti ti-x text-[18px]" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted">Archivo</label>
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className={uploadButtonCls}
                        >
                            <i className="ti ti-cloud-upload text-[28px]" aria-hidden="true" />
                            <p className="text-sm">{file ? file.name : 'Haz clic para seleccionar un archivo'}</p>
                            <span className="text-xs">PDF, DOCX, TXT — máx. 5 MB</span>
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".pdf,.docx,.txt"
                            className="hidden"
                            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <p className="text-sm text-muted">Solo se usará el archivo para generar tarjetas. Mantén el documento claro para mejores resultados.</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-muted hover:text-text rounded-xl hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={() => onSubmit(file)}
                        disabled={isLoading || !file}
                        className="px-5 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Procesando...' : 'Subir archivo'}
                    </button>
                </div>
            </div>
        </div>
    )
}
