import { ReactNode } from "react"
import { Link } from "react-router-dom"

type LinkProps = {
    text?: string
    href: string
    children?: ReactNode,
    color?: string
}

const BaseLink: React.FC<LinkProps> = ({text, href, children, color}) => {
    return (
        <Link style={{
            fontFamily: "var(--main-font)",
            textDecoration: "none",
            fontSize: "0.8em",
            color: color ?? "blue"
        }} to={href}>
            {text}
            {children}
        </Link>
    )
}

export default BaseLink