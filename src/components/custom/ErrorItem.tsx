import type { FieldError } from "react-hook-form";

interface Props {
    error: FieldError | undefined
}
export const ErroItem = ({ error }: Props) => {

    if (!error) {
        return;
    }
    return (
        <>
            <p className="text-destructive text-sm">
                {error.message}
            </p>
        </>
    )
}
