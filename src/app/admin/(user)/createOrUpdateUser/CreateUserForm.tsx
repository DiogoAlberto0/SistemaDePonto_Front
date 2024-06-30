"use client"
import { IPosition } from "@/Entitys/Position"
import { IStation } from "@/Entitys/Station"
import { IUser } from "@/Entitys/User"
//form
import { useFormState } from "react-dom"
import { ICreateUserState, handleCreateUser } from "./action"
//components
import { FormAlert } from "@/components/FormAlert"
import { Button } from "@/components/Button"
import { LabelInput } from "@/components/LabelInput"
import { LabelSelect } from "@/components/LabelSelect"
import { Form } from "@/components/Form"
import { Title } from "@/components/Title"

interface ICreateUserFormProps {
    stations: IStation[];
    positions: IPosition[]
    user? : IUser
}

const inicialState: ICreateUserState = {
    message: undefined,
    status: undefined
}
export const CreateUserForm = ({ user, stations, positions }: ICreateUserFormProps) => {

    const [ state, formAction ] = useFormState(handleCreateUser, inicialState)
    
    return(
        <Form action={formAction}>
            <Title as="h1" size="3xl" weight="bold">{user? 'Alterar funcionário' : 'Cadastrar funcionário'}</Title>
            <input type="hidden" name="id" id="id" value={user?.id}/>
            <LabelInput id="name" name="name" type="text" defaultValue={user?.props.name || ''}>Nome:</LabelInput>
            <LabelInput id="phone" name="phone" type="tel" defaultValue={user?.props.phone || ''}>Telefone:</LabelInput>
            <LabelInput id="password" name="password" type="text">Senha:</LabelInput>

            <LabelSelect label="Posto" id="stationId" name="stationId" defaultValue={user?.props.stationId}>
                {stations.map(station => <option key={station.id} value={station.id}>{station.props.name}</option>)}
            </LabelSelect>

            <LabelSelect label="Cargo" id="positionId" name="positionId" defaultValue={user?.props.positionId}>
                {positions.map(position => <option key={position.id} value={position.id}>{position.props.office.toLowerCase()}</option>)}
            </LabelSelect>
            {state.message && <FormAlert variant={state.status === 201 || state.status === 200 ? 'success' : 'danger'}>{state.message}</FormAlert>}
            <Button type="submit" className="w-full">{user? 'Alterar' : 'Cadastrar'}</Button>
        </Form>
    )
}