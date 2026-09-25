"use client";

import { useState, type FormEvent } from "react";

interface StartScreenProps {
  onStart: (name: string, email: string) => void;
}

const TOPICS = [
  "Види насильства та як їх розпізнати",
  "Способи захисту себе та інших",
  "Куди звертатися за допомогою",
  "Ваші права та можливості",
];

export default function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart(name.trim() || "Анонім", email.trim());
  };

  return (
    <div className="screen">
      <form className="welcome-box" onSubmit={handleSubmit}>
        <h2>Вітаємо!</h2>
        <p>Ця вікторина допоможе вам дізнатися більше про:</p>
        <ul>
          {TOPICS.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <div className="user-info">
          <input
            type="text"
            placeholder="Ваше ім'я (необов'язково)"
            aria-label="Ваше ім'я"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Ваш email (необов'язково)"
            aria-label="Ваш email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Почати вікторину
        </button>
      </form>
    </div>
  );
}
