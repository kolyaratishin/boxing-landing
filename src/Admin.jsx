import React, { useEffect, useState } from 'react';

const defaultLinks = {
    stream: '',
    usyk: '',
    verhoeven: '',
};

export default function Admin() {
    const [password, setPassword] = useState('');
    const [links, setLinks] = useState(defaultLinks);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch('/api/links')
            .then((res) => res.json())
            .then((data) => setLinks(data))
            .catch(() => setStatus('Не вдалося завантажити лінки'));
    }, []);

    const updateField = (field, value) => {
        setLinks((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveLinks = async (e) => {
        e.preventDefault();
        setStatus('Зберігаю...');

        try {
            const response = await fetch('/api/admin/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${password}`,
                },
                body: JSON.stringify(links),
            });

            if (!response.ok) {
                setStatus('Невірний пароль або помилка збереження');
                return;
            }

            setStatus('Лінки успішно збережено ✅');
        } catch {
            setStatus('Помилка збереження');
        }
    };

    return (
        <main className="admin-page">
            <form className="admin-card" onSubmit={saveLinks}>
                <h1>Адмінка лендінгу</h1>

                <label>
                    Пароль
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введи пароль"
                    />
                </label>

                <label>
                    Лінк на трансляцію
                    <input
                        value={links.stream}
                        onChange={(e) => updateField('stream', e.target.value)}
                    />
                </label>

                <label>
                    Лінк на Усика
                    <input
                        value={links.usyk}
                        onChange={(e) => updateField('usyk', e.target.value)}
                    />
                </label>

                <label>
                    Лінк на Верховена
                    <input
                        value={links.verhoeven}
                        onChange={(e) => updateField('verhoeven', e.target.value)}
                    />
                </label>

                <button type="submit">Зберегти</button>

                {status && <p className="admin-status">{status}</p>}
            </form>
        </main>
    );
}