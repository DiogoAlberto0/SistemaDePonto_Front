"use client"
//next
import { useState } from "react"
import { useFormState } from "react-dom"
import { State, handleCreateOrUpdateStation } from "./action"
//maps, location
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps"
import { useGeolocation } from "@/components/Geolocation/hook/useGeolocation"
import { GoogleMap } from "@/components/Geolocation/GoogleMap"
//components
import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/Button"
import { FormMain } from "@/components/FormMain"
import { LabelInput } from "@/components/LabelInput"
import { Form } from "@/components/Form"
import { Title } from "@/components/Title"
import { FormAlert } from "@/components/FormAlert"

//icon
import { MapPinSimple } from "@phosphor-icons/react/dist/ssr"



const initialState: State = {
    message: undefined,
    status: undefined
}

const CreateOrUpdateStation = ({
    searchParams: {
        id,
        name,
        longitude,
        latitude,
        cnpj
    }
}: {
    searchParams: {
        id?: string;
        name?: string;
        latitude?: number;
        longitude?: number;
        cnpj?: string;
    }
}

) => {

    const [state, formAction] = useFormState(handleCreateOrUpdateStation, initialState)

    const userCoord = useGeolocation({ redirect: false, watch: false })

    const [coord, setCoord] = useState({
        latitude: -15.083,
        longitude: -48.024
    })

    return (

        <FormMain>
            <BackButton href="/admin/stationRegisters" />
            <Form action={formAction}>

                <Title as="h1" size="2xl" weight="bold">{id ? 'Alterar' : 'Cadastrar'} posto</Title>

                <input type="hidden" name="id" id="id" defaultValue={id} />

                <LabelInput id="name" name="name" type="text" defaultValue={name}>Nome: </LabelInput>
                <LabelInput id="cnpj" name="cnpj" type="text" defaultValue={cnpj}>cnpj: </LabelInput>

                {
                    (!userCoord.coords.latitude && !userCoord.coords.longitude) && (!latitude && !latitude)
                    ?
                    <>
                        <LabelInput id="latitude" name="latitude" type="text" defaultValue={latitude}>Latitude: </LabelInput>
                        <LabelInput id="longitude" name="longitude" type="text" defaultValue={longitude}>Longitude: </LabelInput>
                    </>
                    :
                    <>
                        <input id="latitude" name="latitude" type="hidden" value={coord.latitude} />
                        <input id="longitude" name="longitude" type="hidden" value={coord.longitude} />
                    </>
                }

                <GoogleMap
                    className="h-96 relative"
                    latitude={Number(latitude) || userCoord.coords.latitude}
                    longitude={Number(longitude) || userCoord.coords.longitude}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        setCoord({ latitude: ev.detail.center.lat, longitude: ev.detail.center.lng })
                    }
                >
                    <MapPinSimple weight="fill" size={32} className="text-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 pointer-events-none"></MapPinSimple>
                </GoogleMap>


                {state.message && <FormAlert variant={state.status === 200 || state.status === 201 ? 'success' : 'danger'}>{state.message}</FormAlert>}

                <Button type="submit">{id ? 'Alterar' : 'Cadastrar'}</Button>

            </Form>

        </FormMain>
    )
}

export default CreateOrUpdateStation