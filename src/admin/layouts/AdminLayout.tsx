import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { CustomSidebar } from "../components/CustomSidebar"

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CustomSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
          </header>
          <div className="flex-1 p-6 overflow-auto">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
