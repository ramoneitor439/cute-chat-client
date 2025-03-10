import { DimensionProps } from "../LogoCore";

const FacebookLogo: React.FC<DimensionProps> = (props) => {
    return (
        <svg fill="#fff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            width={props.width} height={props.height} viewBox="0 0 260 260">
            <path d="M130,2C59.308,2,2,59.308,2,130s57.308,128,128,128s128-57.308,128-128S200.692,2,130,2z M179,71h-24
	c-6.627,0-12,5.373-12,12v24h36l-4,32h-32v80h-32v-80H82v-32h29V82.352c0-23.519,19.798-42.188,43.277-40.806L179,43V71z"/>
        </svg>
    )
}

export default FacebookLogo