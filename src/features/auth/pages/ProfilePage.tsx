import { useState, useRef } from 'react'
import { useAuthStore } from '../store/authStore'
import { userService } from '@/features/users/services/userService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(user?.nombre ?? '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    if (!fullName.trim()) return
    setSaving(true)
    setMessage(null)
    try {
      const updated = await userService.updateProfile({ fullName: fullName.trim() })
      setUser({ id: String(updated.id), nombre: updated.fullName, correo: updated.email, rol: updated.rol })
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
    } catch {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' })
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMessage(null)
    try {
      await userService.uploadAvatar(file)
      setMessage({ type: 'success', text: 'Avatar actualizado correctamente' })
    } catch {
      setMessage({ type: 'error', text: 'Error al subir el avatar' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-up max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <i className="ti ti-arrow-left text-[18px]" />
        </button>
        <h1 className="text-lg font-bold text-foreground tracking-tight">Mi perfil</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {user?.nombre?.charAt(0) ?? '?'}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs hover:bg-accent/80 transition-colors"
            >
              <i className="ti ti-camera" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{user?.nombre ?? 'Usuario'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.rol ?? 'student'}</p>
            <p className="text-xs text-muted-foreground">{user?.correo}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Nombre completo</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>

        {message && (
          <div
            className={`rounded-xl p-3 flex items-center gap-2 text-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-700'
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}
          >
            <i className={`ti ${message.type === 'success' ? 'ti-check' : 'ti-alert-circle'} text-[15px]`} />
            {message.text}
          </div>
        )}

        <Button onClick={handleSave} disabled={saving || !fullName.trim()} className="w-full">
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </Card>
    </div>
  )
}
