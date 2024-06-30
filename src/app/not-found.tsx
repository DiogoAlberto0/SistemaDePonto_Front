
import { LinkButton } from '@/components/LinkButton';


export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Página não encontrada</h2>
        <p className="text-gray-700 mb-6">Não foi possível encontrar o recurso solicitado.</p>
        <LinkButton variant="primary" href="/">Voltar para o inicio</LinkButton>
      </div>
    </div>
  );
}
