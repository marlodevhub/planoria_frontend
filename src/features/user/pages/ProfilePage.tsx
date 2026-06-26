import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserProfile, useUpdateProfile, useUploadAvatar, useDeleteAvatar, useUserPreferences, useUpdatePreferences, useResetPreferences, useNotificationSettings, useUpdateNotificationSettings, useTestNotification, useDeleteAccount, useDeactivateAccount, useExportData } from '../hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const profileSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
})

type ProfileFormFields = z.infer<typeof profileSchema>

export function ProfilePage() {
  const [tab, setTab] = useState('profile')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false)
  const [deactivatePassword, setDeactivatePassword] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: profile, isLoading: profileLoading } = useUserProfile()
  const { data: preferences } = useUserPreferences()
  const { data: notificationSettings } = useNotificationSettings()

  const updateProfile = useUpdateProfile()
  const uploadAvatar = useUploadAvatar()
  const deleteAvatar = useDeleteAvatar()
  const updatePreferences = useUpdatePreferences()
  const resetPreferences = useResetPreferences()
  const updateNotificationSettings = useUpdateNotificationSettings()
  const testNotification = useTestNotification()
  const deactivateAccount = useDeactivateAccount()
  const deleteAccount = useDeleteAccount()
  const exportData = useExportData()

  const profileForm = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema) as any,
    values: {
      fullName: profile?.fullName ?? '',
    },
  })

  function onProfileSubmit(data: ProfileFormFields) {
    try {
      updateProfile.mutate(data)
    } catch (err) {
      console.error("Error al actualizar perfil:", err)
    }
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    uploadAvatar.mutate(file, {
      onSettled: () => { if (fileInputRef.current) fileInputRef.current.value = '' },
    })
  }

  if (profileLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
            {profile?.avatar ? (
              <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              profile?.fullName?.[0]?.toUpperCase() ?? 'U'
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
            <button
              type="button"
              className="text-white text-xs p-1 hover:bg-white/20 rounded"
              onClick={() => fileInputRef.current?.click()}
              title="Cambiar avatar"
            >
              📷
            </button>
            {(profile?.avatar || deleteAvatar.isPending) && (
              <button
                type="button"
                className="text-white text-xs p-1 hover:bg-white/20 rounded"
                onClick={() => deleteAvatar.mutate()}
                title="Eliminar avatar"
              >
                🗑️
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{profile?.fullName}</h1>
          <p className="text-muted-foreground">{profile?.email}</p>
          <Badge variant="secondary" className="mt-1">{profile?.role}</Badge>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Editar Perfil</h2>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                  <Input value={profile?.email ?? ''} disabled className="text-muted-foreground" />
                </div>
                <Button type="submit" disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Preferencias</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetPreferences.mutate()}
                disabled={resetPreferences.isPending}
              >
                {resetPreferences.isPending ? 'Restableciendo...' : 'Restablecer predeterminadas'}
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-muted-foreground">{preferences?.language}</p>
                </div>
                <Select
                  value={preferences?.language ?? 'es'}
                  onValueChange={(value) => updatePreferences.mutate({ language: value })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tema</p>
                  <p className="text-sm text-muted-foreground">{preferences?.theme}</p>
                </div>
                <Select
                  value={preferences?.theme ?? 'system'}
                  onValueChange={(value) => updatePreferences.mutate({ theme: value as 'light' | 'dark' | 'system' })}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Zona horaria</p>
                  <p className="text-sm text-muted-foreground">{preferences?.timezone}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updatePreferences.mutate({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })}
                >
                  Usar zona local
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Notificaciones</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testNotification.mutate()}
                disabled={testNotification.isPending}
              >
                {testNotification.isPending ? 'Enviando...' : 'Enviar prueba'}
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Notificaciones por email', value: notificationSettings?.emailNotifications },
                { key: 'pushNotifications', label: 'Notificaciones push', value: notificationSettings?.pushNotifications },
                { key: 'weeklyDigest', label: 'Resumen semanal', value: notificationSettings?.weeklyDigest },
                { key: 'studyReminders', label: 'Recordatorios de estudio', value: notificationSettings?.studyReminders },
                { key: 'marketingEmails', label: 'Emails de marketing', value: notificationSettings?.marketingEmails },
                { key: 'courseUpdates', label: 'Actualizaciones de cursos', value: notificationSettings?.courseUpdates },
                { key: 'achievementAlerts', label: 'Alertas de logros', value: notificationSettings?.achievementAlerts },
              ].map(({ key, label, value }) => (
                <div key={key}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{label}</p>
                    <Button
                      variant={value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateNotificationSettings.mutate({ [key]: !value })}
                    >
                      {value ? 'Activado' : 'Desactivado'}
                    </Button>
                  </div>
                  <Separator className="mt-2" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4 mt-4">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Exportar datos</h2>
            <p className="text-sm text-muted-foreground">Descargá todos tus datos en un archivo.</p>
            <Button variant="outline" onClick={() => exportData.mutate()} disabled={exportData.isPending}>
              {exportData.isPending ? 'Exportando...' : 'Exportar datos'}
            </Button>
          </Card>

          <Card className="p-6 space-y-4 border-red-500/30">
            <h2 className="text-lg font-semibold text-red-400">Zona de peligro</h2>
            <p className="text-sm text-muted-foreground">
              Estas acciones son irreversibles. Procedé con cuidado.
            </p>
            <div className="flex gap-3">
              <Dialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    disabled={deactivateAccount.isPending}
                  >
                    {deactivateAccount.isPending ? 'Desactivando...' : 'Desactivar cuenta'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Desactivar cuenta</DialogTitle>
                    <DialogDescription>
                      Ingresá tu contraseña para desactivar la cuenta. Podrás reactivarla después iniciando sesión.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-2">
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={deactivatePassword}
                      onChange={(e) => setDeactivatePassword(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeactivateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      disabled={!deactivatePassword || deactivateAccount.isPending}
                      onClick={() => {
                        deactivateAccount.mutate(deactivatePassword, {
                          onSuccess: () => { setDeactivateDialogOpen(false); setDeactivatePassword(''); },
                        })
                      }}
                    >
                      {deactivateAccount.isPending ? 'Desactivando...' : 'Desactivar'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" disabled={deleteAccount.isPending}>
                    {deleteAccount.isPending ? 'Eliminando...' : 'Eliminar cuenta'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Eliminar cuenta</DialogTitle>
                    <DialogDescription>
                      Esta acción es irreversible. Escribí tu contraseña y <strong>ELIMINAR</strong> para confirmar.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-2">
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                    />
                    <Input
                      placeholder='Escribí "ELIMINAR" para confirmar'
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={!deletePassword || deleteConfirm !== 'ELIMINAR' || deleteAccount.isPending}
                      onClick={() => {
                        deleteAccount.mutate(
                          { password: deletePassword, confirmationText: deleteConfirm },
                          {
                            onSuccess: () => setDeleteDialogOpen(false),
                          },
                        )
                      }}
                    >
                      {deleteAccount.isPending ? 'Eliminando...' : 'Eliminar cuenta'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
