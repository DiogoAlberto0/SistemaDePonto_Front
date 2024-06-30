import { GeolocationError } from "./GeolocationError"


const LocationError = ({ searchParams: { message }}: { searchParams: { message?: string } }) => {
    return <GeolocationError message={message || 'Ocorreu um erro inesperado ao tentar acessar sua localização, tente novamente'} />
}

export default LocationError