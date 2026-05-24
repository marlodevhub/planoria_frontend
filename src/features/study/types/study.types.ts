export interface Flashcard {
    idFlashcard: number;
    idAnalisis: number;
    pregunta: string;
    respuesta: string;
    nivelDificultad: 'BAJO' | 'MEDIO' | 'ALTO' | string;
    vecesEstudiada: number;
    fechaCreacion: string;
}

export interface Quiz {
    idQuiz: number;
    idAnalisis: number;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
}

export interface AnalisisIA {
    idAnalisis: number;
    idArchivo: number;
    resumen: string;
    temasDetectados: string | null;
    estadoProceso: string;
    fechaAnalisis: string;
    flashcards: Flashcard[];
    quizzes: Quiz[];
}

export interface UploadFileResponse {
    idArchivo: number;
    idUsuario: number;
    nombreArchivo: string;
    urlArchivo: string;
    tipoArchivo: string;
    tamanoMB: number;
    fechaSubida: string;
    estado: string;
    analisisIA: AnalisisIA[];
}