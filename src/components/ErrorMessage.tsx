// src/components/ErrorMessage.tsx
"use client";

import React from "react";

const ErrorMessage = ({ message }) => {
    if (!message) return null; // Não renderiza se não houver mensagem

    return (
        <div className="text-center text-red-600">
            {message}
        </div>
    );
};

export default ErrorMessage;