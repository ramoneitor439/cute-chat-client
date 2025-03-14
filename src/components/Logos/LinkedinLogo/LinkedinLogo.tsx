import { DimensionProps } from "../LogoCore";

const LinkedinLogo: React.FC<DimensionProps> = (props) => {
    return (
        <svg fill="#fff" width={props.width} height={props.height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <circle cx="512" cy="512" r="512" style={{
                fill: "#0a66c2"
            }} />
            <path d="M693.1 693.2h-76v-119c0-28.4-.6-64.9-39.6-64.9-39.6 0-45.7 30.9-45.7 62.8v121.1h-76V448.4h73v33.4h1c10.2-19.2 35-39.5 72-39.5 77 0 91.2 50.7 91.2 116.6l.1 134.3zm-323-278.3c-24.5 0-44.1-19.8-44.1-44.1s19.7-44.1 44.1-44.1c24.4 0 44.1 19.8 44.1 44.1s-19.8 44.1-44.1 44.1zm38.1 278.3H332V448.4h76.2v244.8zM731.1 256H293.9c-20.9 0-37.9 16.5-37.9 37v439c0 20.4 16.9 37 37.9 37H731c20.9 0 38-16.5 38-37V293c0-20.5-17.1-37-37.9-37z" />
        </svg>
    )
}

export default LinkedinLogo