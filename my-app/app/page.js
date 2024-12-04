'use client'

import { useRouter } from 'next/navigation'

import { useState } from "react";


export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/citydetails?search=${query}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "#fff",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Search Your City name</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type city name..."
          style={{
            padding: "12px 20px",
            fontSize: "2rem",
            borderRadius: "30px",
            border: "none",
            width: "600px",
            outline: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            fontSize: "2rem",
            color: "#fff",
            backgroundColor: "#ff5722",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#e64a19")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#ff5722")
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}