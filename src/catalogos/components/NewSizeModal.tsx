import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sizes, type Size } from "@/interfaces/producto";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSizeAdded: (size: Size) => void;
    existingSizes: Size[];
}

export const NewSizeModal = ({ open = true, onOpenChange, onSizeAdded, existingSizes }: Props) => {
    const availableSizes = useMemo(() => {
        const usedSizes = new Set(existingSizes.map(s => s.size));
        return Sizes.filter(size => !usedSizes.has(size))
    }, [existingSizes])

    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<Size>({
        defaultValues: {
            size: undefined,
            price: 0,
        }
    })

    useEffect(() => {
        if (availableSizes.length === 0) return;

        const defaultSize = availableSizes.includes('Por defecto')
            ? 'Por defecto'
            : availableSizes[0];

        setValue('size', defaultSize);
    }, [availableSizes, setValue]);


    const handleSubmitLocal = (size: Size) => {
        console.log('handleSubmitLocal: ', size)
        onSizeAdded(size);
        reset();
        onOpenChange(false);
    }

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader className="flex items-center ">
                    <DialogTitle>Agregar tamaño y precio</DialogTitle>
                    <DialogDescription>Agregar tamaño disponible y precio</DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={(handleSubmit(handleSubmitLocal))}>
                    <div className="space-y-2">
                        <Controller
                            name="size"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Seleccionar un tamaño'></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableSizes && availableSizes.map(size => (
                                            <SelectItem key={size} value={size}>{size}</SelectItem>
                                        ))
                                        }
                                    </SelectContent>
                                </Select>
                            )}
                        >
                        </Controller>
                        {errors.size && <p className="text-sm text-destructive">{errors.size.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>
                        <Input
                            id="size-name"
                            placeholder="Tamaño"
                            type="number"
                            {...register('price', { required: true, min: 1, valueAsNumber:true })}
                        ></Input>
                        {errors.price && <p className="text-sm text-destructive">El precio debe ser mayor a 0</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Agregar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
