// src/components/PriceDisplay.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/formatting";

const PriceDisplay = ({ price, controls, selectedCurrency }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-6xl mb-4 text-gray-300">
        {selectedCurrency ? selectedCurrency.fullName : "Criptomoeda"} AGORA
      </h3>
      <motion.div
        className="text-9xl font-bold mb-2 text-gray-200"
        animate={controls}
      >
        {price !== null ? formatCurrency(price) : "---"}
      </motion.div>
      <p className="mt-4">
        O preço é atualizado automaticamente a cada 30 segundos.
      </p>
    </div>
  );
};

export default PriceDisplay;