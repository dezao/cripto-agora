// src/components/SearchBar.tsx
"use client";

import React from "react";

interface SearchBarProps {
  searchVisible: boolean;
  setSearchTerm: (term: string) => void;
  filteredOptions: Array<{ value: string; label: string }>;
  highlightedIndex: number;
  handleCoinChange: (option: { value: string; label: string }) => void;
  setSearchVisible: (visible: boolean) => void;
  noResultsMessage: string; // Adicione esta linha
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchVisible,
  setSearchTerm,
  filteredOptions,
  highlightedIndex,
  handleCoinChange,
  setSearchVisible,
  noResultsMessage, // Recebendo a prop
}) => {
  return (
    searchVisible && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
        <input
          type="text"
          placeholder="Buscar criptomoeda..."
          className="p-4 w-1/2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-zinc-700 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {filteredOptions.length > 0 ? (
          <div className="mt-4 w-1/2 rounded-lg shadow-lg bg-black">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                className={`p-3 cursor-pointer border border-gray-600 rounded-lg mb-1 hover:bg-zinc-700 ${
                  highlightedIndex === index ? "bg-gray-600" : "text-gray-200"
                }`}
                onClick={() => handleCoinChange(option)}
              >
                {option.label} - {option.fullName}
              </div>
            ))}
          </div>
        ) : (
          noResultsMessage && ( // Renderiza a mensagem de erro apenas se houver um texto
            <div className="mt-4 p-6 cursor-pointer border border-gray-600 rounded-lg mb-1 bg-black text-white text-center">
              {noResultsMessage}
            </div>
          )
        )}
      </div>
    )
  );
};

export default SearchBar;