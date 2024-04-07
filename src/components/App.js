import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=[API_KEY]&max=10&lang=en`);
        const data = await response.json();
        setNewsData(data.articles);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, [category]); // Fetch data whenever category changes

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? ( // Display loading message if loading is true
        <p className='loader'>Loading...</p>
      ) : (
        <ol>
          {newsData.map((news, index) => (
            <li key={index}>
              <img className='news-img' src={news.image} alt=""/>
              <section className='new-title-content-author'>
                <h3 className='news-title'>{news.title}</h3>
                <section className='new-content-author'>
                  <p className='news-description'>{news.description}</p>
                  <p className='news-source'><strong>Source:</strong> {news.source.name}</p>
                </section>
              </section>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default App;
