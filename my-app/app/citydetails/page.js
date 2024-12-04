"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      if (!search) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/details/${search}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#e0f7fa",
        }}
      >
        <p style={{ fontSize: "1.5rem", color: "#00796b", fontWeight: "bold" }}>
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#ffebee",
          color: "#d32f2f",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Error</h1>
        <p>{error}</p>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#b71c1c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#d32f2f")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f5f5f5",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#555" }}>No results found for "{search}"</h1>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#0277bd",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#01579b")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0277bd")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { ogTitle, ogDescription, ogImage, ogUrl, ogSiteName, twitterTitle, twitterDescription } =
    data;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f1f8e9",
        fontFamily: "'Roboto', sans-serif",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "20px",
          color: "#33691e",
        }}
      >
        Open Graph Data for "{search}"
      </h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "10px",
            color: "#33691e",
          }}
        >
          {ogTitle}
        </h2>
        <p style={{ fontSize: "1rem", color: "#4e342e", marginBottom: "10px" }}>
          {ogDescription}
        </p>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {ogImage && ogImage[0]?.url && (
            <img
              src={ogImage[0].url}
              alt="OG Image"
              style={{
                maxWidth: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        </div>
        <p style={{ fontSize: "1rem", color: "#4e342e" }}>
          <strong>URL:</strong>{" "}
          <a
            href={ogUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0277bd", textDecoration: "none" }}
          >
            {ogUrl}
          </a>
        </p>
        <p style={{ fontSize: "1rem", color: "#4e342e" }}>
          <strong>Site Name:</strong> {ogSiteName}
        </p>
        <div style={{ marginTop: "20px" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              color: "#33691e",
              marginBottom: "10px",
            }}
          >
            Twitter Data
          </h3>
          <p style={{ fontSize: "1rem", color: "#4e342e" }}>
            <strong>Title:</strong> {twitterTitle}
          </p>
          <p style={{ fontSize: "1rem", color: "#4e342e" }}>
            <strong>Description:</strong> {twitterDescription}
          </p>
        </div>
      </div>
    </div>
  );
}