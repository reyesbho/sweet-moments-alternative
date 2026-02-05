import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { useState, type FormEvent } from "react"
import { useAuthStore } from "@/auth/store/auth.store"
import { toast } from "sonner"
import { CustomLogo } from "@/components/custom/CustomLogo"
import imageLogo from '../../../assets/sweet-moments.webp';

export const RegisterPage = () => {
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();
  const {register} = useAuthStore();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    setIsPosting(true);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullname') as string;
    const isSucces = await register(email, password, fullName);
    if(isSucces){
      navigate('/');
      return;
    }

    toast.error('Correo o/y contraseña no validos');
    setIsPosting(false);

  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <form className="p-6 md:p-8" onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <CustomLogo></CustomLogo>
                <p className="text-balance text-muted-foreground">Crea una nueva cuenta</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input name="fullname" id="fullname" type="text" placeholder="nombre" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input name="email" id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input name="password" id="password" type="password" required placeholder="Contraseña" />
              </div>
              <Button disabled={isPosting} type="submit" className="w-full">
                Crear cuenta
              </Button>
              <div className="text-center text-sm"> 
                Ya tienes cuenta {' '}
                <Link to='/auth/Login' className="underline underline-offset-4">
                    Ingresar
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:flex md:justify-center md:items-center">
            <img
              src={imageLogo}
              alt="Image"
              className="h-70 w-70 inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Haciendo click, estas de acuerdo con <a href="#">terminos y condiciones</a> y <a href="#">politicas de uso</a>.
      </div>
    </div>
  )
}

