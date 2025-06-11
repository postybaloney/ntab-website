import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PubsScene from "./PubsScene";

export default function Publications() {
  const [mediumArticles, setMediumArticles] = useState([]);

  useEffect(() => {
    // Fetch top articles
    fetch('https://medium2.p.rapidapi.com/user/db47bd277bbb/top_articles', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c708aac96dmshd58bc8c19b97c38p168378jsn2b1233da935f',
        'x-rapidapi-host': 'medium2.p.rapidapi.com'
      }
    })
      .then(res => res.json())
      .then(async data => {
        // data.top_articles is an array of article IDs
        const articles = await Promise.all(
          data.top_articles.slice(0, 3).map(async (id) => {
            const res = await fetch(`https://medium2.p.rapidapi.com/article/${id}`, {
              method: 'GET',
              headers: {
                'x-rapidapi-key': 'c708aac96dmshd58bc8c19b97c38p168378jsn2b1233da935f',
                'x-rapidapi-host': 'medium2.p.rapidapi.com'
              }
            });
            return res.json();
          })
        );
        setMediumArticles(articles);
      })
      .catch(err => {
        console.error("Failed to fetch Medium articles:", err);
      });
  }, []);

  return (
    <div>
        <Navbar />
        <PubsScene />
        <div className="Section">
            <h1 className="title">Publications</h1>
            <h2>Medium Articles</h2>
            <ul>
            {mediumArticles.map((article, idx) => (
                <li key={idx} style={{ marginBottom: "2rem" }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img
                    src={article.image_url}
                    alt={article.title}
                    style={{ maxWidth: "200px", display: "block" }}
                    />
                    <h3>{article.title}</h3>
                </a>
                <p>{article.subtitle}</p>
                </li>
            ))}
            </ul>
            {/* ...your other publication lists here... */}
        </div>
        <div className="Section">
            <h2>Neurotalk: Spotify Podcast</h2>
            <iframe
                src="https://open.spotify.com/embed/show/6ISrYY3xwVvIBqp8gqWNOx?si=707452f565f34240"
                width="25%"
                height="232"
                style={{ borderRadius: "12px", border: "none" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Podcast"
            ></iframe>
        </div>
        <div className="Section">
            <h2>MIND Magazine</h2>
            <ul>
                <p>Coming soon. . .</p>
            </ul>
        </div>
    </div>
  );
}