import { Link } from "react-router"

interface Props{
    title?: string
}
export const CustomLogo = ({title = 'Sweet Moments'}: Props) => {
  return (
    <Link to='/' className="flex items-center whitespace-nowrap">
        <span className="text-3xl font-cursive font-bold m-0 whitespace-nowrap">
            {title}
        </span>
    </Link>
  )
}
