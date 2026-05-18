import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import boxersImage from './assets/boxers.png';

const links = [
  {
    title: 'Безкоштовна пряма трансляція',
    url: 'https://example.com/stream',
  },
  {
    title: 'Поставити на Усика',
    url: 'https://example.com/usyk',
  },
  {
    title: 'Поставити на Верховіна',
    url: 'https://example.com/verhovin',
  },
];

function App() {
  return (
    <main className="page">
      <section className="phone-card">
        <header className="hero-header">
          <div className="badge">Бонус для тебе</div>
        </header>

        <nav className="button-list" aria-label="Бонусні посилання">
          {links.map((link) => (
            <a className="neon-button" href={link.url} target="_blank" rel="noreferrer" key={link.title}>
              {link.title}
            </a>
          ))}
        </nav>

        <img className="boxers" src={boxersImage} alt="Боксери перед боєм" />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
