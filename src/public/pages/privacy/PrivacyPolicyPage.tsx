import { CustomLogo } from "@/components/custom/CustomLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    <Separator />
  </div>
);

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <CustomLogo title="Dulces Momentos" />
          <p className="text-muted-foreground text-sm">Políticas de Privacidad</p>
          <p className="text-xs text-muted-foreground">Última actualización: abril 2025</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tu privacidad es importante para nosotros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">

            <Section title="1. Información que recopilamos">
              <p>
                Al usar la aplicación <strong>Dulces Momentos</strong>, podemos recopilar los siguientes
                tipos de información:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre y correo electrónico al registrarte.</li>
                <li>Información de pedidos: productos, tallas, precios y fechas de entrega.</li>
                <li>Datos de sesión para mantener tu acceso activo de forma segura.</li>
              </ul>
            </Section>

            <Section title="2. Uso de la información">
              <p>La información recopilada se utiliza exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gestionar y mostrar tus pedidos dentro de la plataforma.</li>
                <li>Identificarte como usuario autorizado del sistema.</li>
                <li>Mejorar la experiencia de uso de la aplicación.</li>
              </ul>
              <p>No vendemos, compartimos ni cedemos tu información personal a terceros.</p>
            </Section>

            <Section title="3. Autenticación y seguridad">
              <p>
                Utilizamos <strong>Firebase Authentication</strong> (proporcionado por Google LLC) para
                gestionar el inicio de sesión de forma segura. Los datos de autenticación se almacenan en
                los servidores de Firebase bajo los términos de privacidad de Google.
              </p>
              <p>
                Las sesiones tienen un tiempo de expiración automático y pueden ser revocadas en cualquier
                momento.
              </p>
            </Section>

            <Section title="4. Almacenamiento de datos">
              <p>
                Los datos de pedidos, productos y categorías se almacenan en <strong>Firebase Firestore</strong>,
                un servicio de base de datos en la nube de Google. Estos datos están protegidos mediante
                reglas de seguridad que impiden el acceso no autorizado.
              </p>
            </Section>

            <Section title="5. Permisos en la versión web">
              <p>La versión web puede requerir acceso a los siguientes recursos del navegador:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Almacenamiento local (localStorage / cookies):</strong> Para mantener tu sesión
                  activa entre visitas.
                </li>
                <li>
                  <strong>Conexión a internet:</strong> Necesaria para cargar y sincronizar datos en tiempo real.
                </li>
              </ul>
            </Section>

            <Section title="6. Permisos en la versión móvil">
              <p>
                Si utilizas la versión móvil de <strong>Dulces Momentos</strong> (Android / iOS), la
                aplicación puede solicitar los siguientes permisos del dispositivo:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Cámara:</strong> Para tomar o adjuntar fotos de productos en pedidos o catálogos.
                  Este permiso es opcional y solo se activa cuando eliges adjuntar una imagen.
                </li>
                <li>
                  <strong>Almacenamiento / Galería:</strong> Para seleccionar imágenes desde tu dispositivo
                  al crear o editar productos.
                </li>
                <li>
                  <strong>Notificaciones push:</strong> Para enviarte avisos sobre el estado de tus pedidos
                  o recordatorios de entregas próximas. Puedes desactivar las notificaciones desde la
                  configuración de tu dispositivo.
                </li>
                <li>
                  <strong>Acceso a internet:</strong> Indispensable para la sincronización de datos con
                  los servidores.
                </li>
              </ul>
              <p>
                Ningún permiso es requerido de forma obligatoria para el funcionamiento básico de la
                aplicación, excepto el acceso a internet.
              </p>
            </Section>

            <Section title="7. Cookies y seguimiento">
              <p>
                No utilizamos cookies de seguimiento publicitario ni compartimos datos con plataformas de
                análisis de terceros. Solo se usan cookies esenciales para mantener tu sesión activa.
              </p>
            </Section>

            <Section title="8. Derechos del usuario">
              <p>Como usuario tienes derecho a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solicitar la eliminación de tu cuenta y todos los datos asociados.</li>
                <li>Conocer qué información tenemos registrada sobre ti.</li>
                <li>Revocar permisos otorgados en cualquier momento desde tu dispositivo.</li>
              </ul>
            </Section>

            <Section title="9. Cambios en esta política">
              <p>
                Podemos actualizar estas políticas de privacidad ocasionalmente. Te notificaremos de
                cambios significativos a través de la aplicación. El uso continuo de la aplicación
                después de publicar cambios implica tu aceptación de los mismos.
              </p>
            </Section>

            <div className="text-xs text-muted-foreground text-center pt-2">
              Si tienes preguntas sobre estas políticas, puedes contactarnos a través de la aplicación.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
