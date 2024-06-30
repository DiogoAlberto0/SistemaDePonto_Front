import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { navigate } from "./action"


interface CoordsStateType {
    coords: {
        latitude: number | undefined,
        longitude: number | undefined
    }
}

export const useGeolocation = ({ redirect, watch }: { redirect: boolean, watch: boolean }) => {

    const [coordsState, setCoordsState] = useState<CoordsStateType>({
        coords: {
            latitude: undefined,
            longitude: undefined
        }
    })

    useEffect(() => {

        watch
            ?
            navigator.geolocation.watchPosition((position) => {
                setCoordsState({ coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
            },
                async (error) => {
                    redirect ? await navigate(error.message) : console.warn(error)
                }, {
                enableHighAccuracy: true,
                maximumAge: 1000
            })
            :
            navigator.geolocation.getCurrentPosition((position) => {
                setCoordsState({ coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
            },
                async (error) => {
                    redirect ? await navigate(error.message) : console.warn(error)
                }, {
                enableHighAccuracy: true,
                maximumAge: 1000
            })
    }, [redirect, watch])

    return coordsState

}