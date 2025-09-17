// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found.</p>
      <Link to="/" className="mt-4 inline-block text-blue-600">Go Home</Link>
    </div>
  );
}

