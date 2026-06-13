const apiUrl = import.meta.env.VITE_API_URL // lee la variable

if (!apiUrl) {
    throw new Error('VITE_API_URL is required. Define it in .env or .env.local') // valida en arranque
}

export const env = {
    apiUrl,
} as const // exporta tipado y readonly