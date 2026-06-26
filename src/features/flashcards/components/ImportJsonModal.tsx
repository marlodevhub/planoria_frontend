import { useState, useRef } from "react";
import { useImportJson } from "../hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImportJsonModalProps {
  deckId: number;
  deckName: string;
  open: boolean;
  onClose: () => void;
}

export function ImportJsonModal({ deckId, deckName, open, onClose }: ImportJsonModalProps) {
  const { mutate: importJson, isPending } = useImportJson(deckId);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.name.endsWith(".json")) {
      setError("Solo se permiten archivos JSON");
      setFile(null);
      return;
    }
    setError(null);
    setFile(selected);
  };

  const handleImport = () => {
    if (!file) return;
    importJson(file, {
      onSuccess: () => { setFile(null); onClose(); },
      onError: () => setError("Error al importar el archivo"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Importar JSON</DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5">{deckName}</p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
            {file ? (
              <div className="space-y-1">
                <i className="ti ti-file-code text-2xl text-primary" />
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : (
              <div className="space-y-1">
                <i className="ti ti-upload text-2xl text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Seleccionar archivo JSON</p>
                <p className="text-xs text-muted-foreground">Array de objetos con question, answer</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/15">
              <i className="ti ti-alert-circle text-destructive text-sm" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button className="flex-1" size="sm" onClick={handleImport} disabled={!file || isPending}>
            {isPending ? "Importando..." : "Importar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
