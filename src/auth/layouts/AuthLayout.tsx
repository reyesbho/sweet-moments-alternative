import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <div className="mt-40 flex items-center justify-center align-middle">
        <Outlet></Outlet>
    </div>
  )
}

export default AuthLayout
