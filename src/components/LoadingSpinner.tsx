// src/components/LoadingSpinner.tsx
"use client";

import React from "react";

const LoadingSpinner = () => (
  <div className="text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
    <p className="mt-4">Carregando...</p>
  </div>
);

export default LoadingSpinner;