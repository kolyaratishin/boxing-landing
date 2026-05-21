import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Admin from './Admin.jsx';
import './styles.css';

const defaultLinks = {
  stream: 'https://t.me/+8EZril-pgpQ4NTcy',
  usyk: 'https://cutt.ly/btB4nZNL5',
  verhoeven: 'https://cutt.ly/KtB4mgnz',
};

function Flag({ country, small = false }) {
  return (
      <span
          className={`flag-icon flag-${country} ${small ? 'flag-small' : ''}`}
          aria-hidden="true"
      />
  );
}

function TextWithBreaks({ text }) {
  return text.split('\n').map((line) => (
      <React.Fragment key={line}>
        {line}
        <br />
      </React.Fragment>
  ));
}

function App() {
  const [links, setLinks] = useState(defaultLinks);

  useEffect(() => {
    fetch('/api/links')
        .then((res) => res.json())
        .then((data) => {
          setLinks({
            stream: data.stream || defaultLinks.stream,
            usyk: data.usyk || defaultLinks.usyk,
            verhoeven: data.verhoeven || defaultLinks.verhoeven,
          });
        })
        .catch(() => {
          setLinks(defaultLinks);
        });
  }, []);

  const buttonLinks = [
    {
      type: 'stream',
      url: links.stream,
    },
    {
      title: 'Поставити\nНа Усика',
      image: '/assets/usyk.png',
      url: links.usyk,
      className: 'usyk-text',
    },
    {
      title: 'Поставити\nНа Верховена',
      image: '/assets/verhoeven.png',
      url: links.verhoeven,
    },
  ];

  return (
      <main className="page">
        <section className="landing">
          <div className="background" aria-hidden="true" />
          <div className="overlay" aria-hidden="true" />

          <header className="title">
            <Flag country="ua" />
            <span>Усик</span>
            <span className="vs">vs</span>
            <span>Верховен</span>
            <Flag country="nl" />
          </header>

          <div className="browser-tip">
            Якщо не відкривається посилання — натисни три крапки зверху і відкрий у браузері
          </div>

          <nav className="actions" aria-label="Посилання">
            {buttonLinks.map((link, index) => (
                <a
                    className={`action action-${index + 1}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                >
                  {link.image && (
                      <span className="fighter-avatar">
                  <img src={link.image} alt="" />
                </span>
                  )}

                  <span className={`action-text ${link.className || ''}`}>
                {link.type === 'stream' ? (
                    <>
                    <span className="stream-line">
                      <Flag country="ua" small /> Безкоштовна
                    </span>

                      <span className="stream-line">
                      Пряма трансляція бою <Flag country="ua" small />
                    </span>
                    </>
                ) : (
                    <TextWithBreaks text={link.title} />
                )}
              </span>
                </a>
            ))}
          </nav>
        </section>
      </main>
  );
}
const isAdminPage = window.location.pathname === '/admin';
createRoot(document.getElementById('root')).render(
    isAdminPage ? <Admin /> : <App />
);