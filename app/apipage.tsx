"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState<
    { id: number; title: string; body: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("pages/api/Fetch") // Correct API endpoint
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setPosts(data.data); // Set the posts data
        } else {
          setError(data.message || "Failed to fetch posts.");
        }
      })
      .catch((err) => {
        if (err instanceof Error) {
          console.error("Error:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred.");
        }
      })
      .finally(() => setLoading(false)); // Stop loading
  }, []);
  
  if (loading)
    return (
      <p className="justify-center items-center text-center text-4xl mt-20 font-bold text-green-950">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <h1 className="text-green-800 text-3xl font-bold text-center p-4 shadow-lg">
        Today's Posts
      </h1>
      <div className="flex flex-wrap gap-4 w-auto p-5 justify-center">
        {posts.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-3 shadow-lg w-80 border border-gray-300 rounded-md"
          >
            <div className="text-2xl text-green-800 font-bold m-5 text-center">
              Data No : {item.id}
            </div>
            <hr />
            <h2 className="text-xl font-semibold text-green-800 mt-4 text-center">
              {item.title}
            </h2>
            <p className="text-gray-600 mt-4 text-center">{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
