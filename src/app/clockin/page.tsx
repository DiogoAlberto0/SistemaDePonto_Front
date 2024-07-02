"use server"
import { authService } from '@/services/auth.service';
import { redirect } from 'next/navigation';

//components
import { BackButton } from '@/components/BackButton'
import { ClockinForm } from './components/ClockinForm/ClockinForm';




const ClockIn = async () => {

    const { data } = await authService.getPrivilegeLevel()
    if(!data?.privillegeLevel || data.privillegeLevel < 1) redirect('signin')
        
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">

            <BackButton href="dashboard" className="absolute top-4 left-4" />


            <ClockinForm />

        </main>
    )
}

export default ClockIn
