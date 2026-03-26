import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import type { Abono } from "@/interfaces/pedidos-response";

interface Props {
    open: boolean;
    onClose: () => void;
    onAgregar: (abono: Abono) => void;
}

export const AbonosModal = ({ open, onClose, onAgregar }: Props) => {
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState(() => new Date().toISOString().split('T')[0]);

    const handleAgregar = () => {
        const montoNum = parseFloat(monto);
        if (!montoNum || montoNum <= 0) return;

        const fechaDate = new Date(fecha + 'T12:00:00');
        onAgregar({
            monto: montoNum,
            fecha: Timestamp.fromDate(fechaDate),
        });
        setMonto('');
        setFecha(new Date().toISOString().split('T')[0]);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Agregar Abono</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="monto">Monto</Label>
                        <Input
                            id="monto"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={monto}
                            onChange={(e) => setMonto(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fecha">Fecha</Label>
                        <Input
                            id="fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={handleAgregar}
                        disabled={!monto || parseFloat(monto) <= 0}
                    >
                        Agregar abono
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
