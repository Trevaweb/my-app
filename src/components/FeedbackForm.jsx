"use client"
import React, { useState } from "react";

const FeedbackForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const data = { name, email, feedback };

        try{
            const response = await fetch("http://localhost:5000/submit-feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
             },
            body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage("Feedback submitted succesfully!")
                setName("");
                setEmail("");
                setFeedback("");
            }else{
                setMessage("Failed to submit feedback");
            }
        } catch (error) {
            setMessage("Error: Failed to connect to the server.");
            console.error("Error:", error);
        }
    };


  return (
    <div className="max-w-md mx-auto p-4 border rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">
          Name:
          <input
            type="text"
            className="block w-full border rounded-lg p-2 mt-1"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block mb-2 text-sm font-medium">
          Email:
          <input
            type="email"
            className="block w-full border rounded-lg p-2 mt-1"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block mb-2 text-sm font-medium">
          Feedback:
          <textarea
            className="block w-full border rounded-lg p-2 mt-1"
            rows="4"
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-3"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default FeedbackForm;