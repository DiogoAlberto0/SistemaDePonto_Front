"use client"
//form action
import { useFormState } from "react-dom"
import { ClockinStateType, handleClockin } from "../../action"

//geolocation
import { useGeolocation } from "../../../../components/Geolocation/hook/useGeolocation"

//components
import { FormAlert } from "@/components/FormAlert"
import { GoogleMap } from "../../../../components/Geolocation/GoogleMap"
import { Clock } from "../Clock"
import { ButtonClocking } from "../ButtonClocking"
import { LastRegister } from "../LastRegister/LastRegister"
import { NavigationArrow } from "@phosphor-icons/react/dist/ssr"

const inicialState: ClockinStateType = {
    error: undefined,
    status: undefined,
    statusText: undefined,
    successMessage: undefined
}

export const ClockinForm = () => {

    const [state, formAction] = useFormState(handleClockin, inicialState)
    
    const { coords } = useGeolocation({ redirect: true, watch: true })


    return (
        <>
            {state.successMessage && <FormAlert variant="success" className="absolute top-4 right-4 z-10">{state.successMessage}</FormAlert>}
            {state.error && <FormAlert variant="danger" className="absolute top-4 right-4 z-10">{state.status} - {state.error}</FormAlert>}

            {
                coords.latitude && coords.longitude ?
                    <GoogleMap 
                        className="relative w-full h-full" 
                        latitude={coords.latitude} 
                        longitude={coords.longitude}
                        center={{ lat: coords.latitude, lng: coords.longitude }}    
                    >
                        <NavigationArrow className="text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2" size={32} weight="fill" />
                        <Clock className="absolute top-0 bg-gradient-to-b from-white to-transparent" />
                        <form action={formAction} className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2">
                            <input type="hidden" name="latitude" value={coords.latitude} />
                            <input type="hidden" name="longitude" value={coords.longitude} />
                            <ButtonClocking
                                type="submit"
                            >
                                Bater Ponto
                            </ButtonClocking>
                        </form>
                        <LastRegister updateOnChange={state.successMessage} className="absolute bottom-0" />
                    </GoogleMap>
                    :
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-gray-700 text-lg font-semibold">Localizando...</h1>
                    </div>
            }
        </>
    )
}