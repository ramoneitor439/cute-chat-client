import Link from "../BaseLink/BaseLink"
import FacebookLogo from "../Logos/FacebookLogo/FacebookLogo"
import InstagramLogo from "../Logos/InstagramLogo/InstagramLogo"
import LinkedinLogo from "../Logos/LinkedinLogo/LinkedinLogo"

const Footer: React.FC = () => {
    return (
        <footer style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            backgroundColor: "var(--main-background-color)",
            alignItems: "center",
            padding: "10px"
        }}>
            <div style={{
                width: "fit-content",
                display: "flex",
                gap: "1em",
                color: "white",
                textAlign: "center"
            }}>
                <Link color="white" text="Inicio" href="" />
                <Link color="white" text="Sobre nosotros" href="" />
                <Link color="white" text="Terminos y condiciones" href="" />
            </div>
            <div style={{
                width: "fit-content",
                display: "flex",
                gap: "1em",
                color: "white",
                textAlign: "center"
            }}>
                <Link href="">
                    <InstagramLogo height={"2em"} width={"2em"} />
                </Link>
                <Link href="">
                    <FacebookLogo height={"2em"} width={"2em"} />
                </Link>
                <Link href="">
                    <LinkedinLogo height={"2em"} width={"2em"} />
                </Link>
            </div>
            <p style={{
                 fontFamily: "var(--main-font)",
                  color: "white",
                  fontSize: "0.7em"
                }}>Copyright 2025</p>
        </footer>
    )
}

export default Footer