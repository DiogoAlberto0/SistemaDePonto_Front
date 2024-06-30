'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

    // useEffect(() => { console.error(error) }, [error])
  return (
    <html className="h-full">
      <body className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Algo deu errado!</h2>
          <p className="text-gray-700 mb-4">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
          <h3 className="text-red-600 mb-2 font-bold">Message:</h3>
          <p className="text-red-600 mb-6">
            {error.message}
          </p>
          <button
            onClick={() => reset()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
