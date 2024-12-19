"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatting";
import { useAnimation } from "framer-motion";
import Fuse from "fuse.js";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import InfoModal from "./InfoModal";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import PriceDisplay from "./PriceDisplay";

export function CriptoAgora() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState("BTC"); // Moeda selecionada
  const [searchVisible, setSearchVisible] = useState(false); // Controla a visibilidade do campo de busca
  const [searchTerm, setSearchTerm] = useState(""); // Termo de busca para filtrar moedas
  const [highlightedIndex, setHighlightedIndex] = useState(0); // Índice da opção destacada
  const controls = useAnimation(); // Controle de animação
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const currencyOptions = [
    { value: "DOG", label: "DOG", fullName: "DOG" },
    { value: "BTC", label: "BTC", fullName: "BITCOIN" },
    { value: "ETH", label: "ETH", fullName: "ETHEREUM" },
    { value: "XRP", label: "XRP", fullName: "RIPPLE" },
    { value: "USDT", label: "USDT", fullName: "TETHER" },
    { value: "SOL", label: "SOL", fullName: "SOLANA" },
    { value: "BNB", label: "BNB", fullName: "BINANCE COIN" },
    { value: "DOGE", label: "DOGE", fullName: "DOGE COIN" },
    { value: "LTC", label: "LTC", fullName: "LITECOIN" },
    { value: "BCH", label: "BCH", fullName: "BITCOIN CASH" },
    { value: "ADA", label: "ADA", fullName: "CARDANO" },
    { value: "HBAR", label: "HBAR", fullName: "HEDERA" },
    { value: "CAKE", label: "CAKE", fullName: "PANCAKESWAP" },
    { value: "UNI", label: "UNI", fullName: "UNISWAP" }
  ];

  const fetchPrice = async () => {
    if (!selectedCoin) {
      console.error("selectedCoin is undefined");
      return; // Retorna se selectedCoin não estiver definido
    }

    let url = `https://api.bitpreco.com/${selectedCoin.toLowerCase()}-brl/ticker`; // URL dinâmica com a moeda selecionada

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.buy) {
        // Verifica se o preço anterior está definido
        if (previousPrice !== null) {
          // Aplica animação de escala sempre que o preço mudar
          controls.start({ scale: 1.1 }); // Animação para atualização de preço
          setTimeout(() => {
            controls.start({ scale: 1 }); // Retorna à escala normal após a animação
          }, 300); // Duração da animação
        }
        setPreviousPrice(data.buy); // Atualiza o preço anterior
        setPrice(data.buy); // Atualiza o preço da criptomoeda
      } else {
        setError("Falha ao carregar o preço");
      }
    } catch (err) {
      setError("Falha ao carregar a cotação");
      console.error("Error fetching price:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCurrency = currencyOptions.find(
    (option) => option.value === selectedCoin
  );

  const handleSearchToggle = () => {
    setSearchVisible((prev) => {
      // Se a busca está sendo fechada, resetar o termo de busca
      if (prev) {
        setSearchTerm(""); // Limpa o termo de busca
        setNoResultsMessage(""); // Limpa a mensagem de erro
        setHighlightedIndex(0); // Redefine o índice destacado
      }
      return !prev; // Alterna a visibilidade
    });
  };

  useEffect(() => {
    fetchPrice(); // Fetch price on mount

    const interval = setInterval(() => {
      fetchPrice(); // Atualiza o preço a cada 30 segundos
    }, 30000); // 30000 ms = 30 segundos

    return () => {
      clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    };
  }, [selectedCoin]);

  // Atualiza o título da página com o valor da moeda selecionada
  useEffect(() => {
    if (price !== null) {
      document.title = `${selectedCoin}: ${formatCurrency(price)}`; // Exibe apenas o código da moeda e o valor
    }
  }, [price, selectedCoin]);

  const handleCoinChange = (selectedOption: { value: string; label: string }) => {
    if (selectedOption && selectedOption.value) { // Verifica se selectedOption é válido
      setSelectedCoin(selectedOption.value); // Atualiza a moeda selecionada
      fetchPrice(); // Atualiza o preço ao mudar a moeda
      setSearchVisible(false); // Oculta o campo de busca após seleção
      setSearchTerm(""); // Limpa o campo de busca
      setHighlightedIndex(0); // Redefine o índice destacado
    } else {
      console.error("selectedOption is undefined or does not have a value");
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.altKey && event.key === "k") {
      setSearchVisible((prev) => !prev); // Alterna a visibilidade do campo de busca
    }

    if (event.key === "Escape") {
      setSearchVisible(false); // Fecha o campo de busca ao pressionar ESC
      setShowModal(false); // Fecha o modal ao pressionar ESC
    }

    if (searchVisible) {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1)
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter") {
        if (filteredOptions.length > 0) {
          handleCoinChange(filteredOptions[highlightedIndex]); // Seleciona a moeda destacada
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchVisible, highlightedIndex]);

  // Configurando o Fuse.js para busca
  const fuse = new Fuse(currencyOptions, {
    keys: ["label", "fullName"], // Campo que será buscado
    threshold: 0.3, // Define a sensibilidade da busca
  });

  // Filtrando opções com base no termo de busca
  const filteredOptions = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : [];

  // useEffect para atualizar a mensagem de resultados
  useEffect(() => {
    if (searchTerm.trim() !== "" && filteredOptions.length === 0) {
      setNoResultsMessage("Criptomoeda não encontrada! Quer adicioná-la à lista?");
    } else {
      setNoResultsMessage(""); // Limpa a mensagem se houver resultados ou se o campo de busca estiver vazio
    }
  }, [filteredOptions, searchTerm]); // Dependências

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-gray-200">
      {" "}

      {/* Navbar */}
      <Navbar
        onSearchToggle={() => setSearchVisible(true)}
        onModalToggle={() => setShowModal(true)}
      />

      {/* Caixa de busca */}
      <SearchBar
        searchVisible={searchVisible}
        setSearchTerm={setSearchTerm}
        filteredOptions={filteredOptions}
        highlightedIndex={highlightedIndex}
        handleCoinChange={handleCoinChange}
        setSearchVisible={handleSearchToggle} // Use handleSearchToggle aqui
        noResultsMessage={noResultsMessage}
      />

      {/* Exibir mensagem de criptomoeda não encontrada */}
      {/* {noResultsMessage && <div className="text-red-600 text-center">{noResultsMessage}</div>} */}

      {/* Exibir mensagem de erro */}
      <ErrorMessage message={error} />

      {/* Exibir spinner de carregamento */}
      {loading && <LoadingSpinner />}

      {/* Modal de Informações */}
      <InfoModal showModal={showModal} setShowModal={setShowModal} />

      {/* Conteúdo Principal */}
      <div className="flex items-center justify-center flex-grow">
        <PriceDisplay price={price} controls={controls} selectedCurrency={selectedCurrency} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
