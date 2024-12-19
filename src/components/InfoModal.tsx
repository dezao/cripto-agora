// src/components/InfoModal.tsx
"use client";

import React from "react";

const InfoModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-200 hover:text-red-500"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <div className="bg-zinc-800 p-4 text-gray-200 text-center">
          <h2 className="text-xl font-bold mb-2">Bem-vindo ao Cripto Agora!</h2>
          <p className="mb-2">Acompanhe os preços de várias criptomoedas em tempo real.</p>
          <p className="mb-2">Os preços são atualizados automaticamente a cada 30 segundos.</p>
          <p className="mb-2">Use a barra de busca (ALT+K) para encontrar rapidamente a moeda desejada.</p>
          <p>Divirta-se explorando o mundo das criptomoedas!</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;