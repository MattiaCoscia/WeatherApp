import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import imageNotAvailable from '../../images/IMGnotAvailable.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsCarousel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "952677781dfa42a2835769b0c9de31db";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: '50px', maxWidth: '800px', margin: 'auto', backgroundColor: 'rgba(154, 218, 245)', borderRadius: '20px', padding: '30px', boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)', marginBottom: '50px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px' }}>
        Latest News
      </Typography>
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index}>
            <Card style={{ margin: '10px' }}>
              <CardContent>
                <img
                  src={article.urlToImage || imageNotAvailable }
                  alt={article.title}
                  style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
                />
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Source: {article.source.name}
                </Typography>
                <br />
                <Typography variant="body2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsCarousel;
