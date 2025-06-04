import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const URLdata = () => {
  const Ref = useRef();
  const [shortCode, setShortCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const originalUrl = Ref.current.value;

    const sendData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/url-shortn", {
          original_url: originalUrl,
        });

        if (response.data && response.data.shortUrl) {
          toast.success("URL shortened successfully!");
          setShortCode(response.data.shortUrl);
        } else {
          toast.error("Unexpected response from server.");
        }
      } catch (error) {
        console.error("Axios Error:", error);
        toast.error("Failed to shorten URL. Please try again.");
      }
    };

    sendData();
  };

  const fullShortUrl = shortCode ? `http://localhost:8000${shortCode}` : "";

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="originalUrl" className="form-label">
              Original URL
            </label>
            <input
              type="url"
              name="originalUrl"
              id="originalUrl"
              placeholder="Enter Original URL"
              className="form-control"
              ref={Ref}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Shorten URL
            </button>
          </div>
        </form>

        {shortCode && (
          <div className="mt-4 text-center">
            <hr />
            <p>Shortened URL:</p>
            <a
              href={fullShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              {fullShortUrl}
            </a>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default URLdata;
