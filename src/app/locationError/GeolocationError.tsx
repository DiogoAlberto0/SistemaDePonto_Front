"use client"
import { Button } from "@/components/Button"
import { MapPin } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"

interface GeolocationErrorProps {
    message: string
}

export const GeolocationError = ({ message }: GeolocationErrorProps) => {
    const router = useRouter()

    return (
        <div className="absolute z-10 h-screen w-screen bg-red-200 flex flex-col justify-center items-center gap-4 p-4">
            <MapPin size={32} className="text-red-700"/>
            <h1 className="text-2xl font-bold text-red-700">Falha ao localizar dispositivo</h1>
            <p className="text-center">Ative a localização e permita que o navegador tenha acesso a ela, recarregue a página. Se o erro persistir, contate seu supervisor.</p>
            <h2 className="text-xl font-medium text-red-600">Erro: {message}</h2>
            <Button onClick={() => router.push('/dashboard')}>Voltar</Button>
        </div>
    )
}
