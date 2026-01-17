import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import logo from '../../assets/sweet-moments.webp';
import { Calendar, ClipboardList, LayoutIcon, Package, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/auth/store/auth.store";

interface MenuSidebar {
    to: string,
    title: string,
    icon:any
}
const menusPedidos: MenuSidebar[] = [
    { to: '/dashboard', title: 'Dashboard', icon:LayoutIcon },
    { to: '/pedidos', title: 'Pedidos', icon:ClipboardList},
    { to: '/pedidos/new', title: 'Nuevo Pedido', icon:PlusCircle },
    { to: '/calendario', title: 'Calendario', icon:Calendar },
]

const menusCatalogos: MenuSidebar[] = [
    { to: '/catalogos/productos', title: 'Productos', icon:Package },
    { to: '/catalogos/productos:new', title: 'Nuevo Producto', icon:PlusCircle }
]

export function CustomSidebar() {

    const {logout} = useAuthStore()
    return (
        <Sidebar className="">
            <SidebarHeader className="items-center">
                <img className="w-20 h-20" src={logo}></img>
                <h1 className="font-cursive text-2xl ">Sweet Moments</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="py-5">
                    <SidebarGroupLabel className="text-1xl bold text-gray-600 py-5">PEDIDOS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {
                            menusPedidos.map(menu => (
                                <SidebarMenuItem key={menu.to}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={menu.to}
                                            className=" flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                                        >
                                            <menu.icon className="w-5 h-5" />
                                            <span>{menu.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="py-5">
                    <SidebarGroupLabel className="text-1xl bold text-gray-600 py-5">CATALOGOS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {
                            menusCatalogos.map(menu => (
                                <SidebarMenuItem key={menu.to}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={menu.to}
                                            className=" flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                                        >
                                            <menu.icon className="w-5 h-5" />
                                            <span>{menu.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button onClick={logout}> Cerrar sesion</Button>
            </SidebarFooter>
        </Sidebar>
    )
}