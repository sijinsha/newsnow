import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewsCard from "./newsCard";
import { fetchNews, updatePage, fetchMore } from "../../slices/newsSlice";
import "../../styles/newsList.css";
import NewsFilter from "./newsFilter";
import InfiniteScroll from "react-infinite-scroll-component";

function NewsList() {
  const newsItems = useSelector((state) => state.news.enitities.articles);
  const details = useSelector((state) => state.news.enitities);
  //const

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({ search: "", lang: "" }));
  }, []);

  const fetchMoreNews = () => {
    dispatch(updatePage());
    dispatch(fetchMore());
  };

  const loader = (
    <div className="loading">
      <div className="loader loader-black"></div>
      <h2>Loading</h2>
    </div>
  );

  return (
    <>
      <NewsFilter />
      <InfiniteScroll
        dataLength={newsItems?.length || 10}
        next={fetchMoreNews}
        hasMore={(newsItems?.length || 10) !== (details?.totalResults || 0)}
        loader={loader}
      >
        <div className="news-list">
          {newsItems && newsItems.map((news, i) => <NewsCard key={news.url} item={news} />)}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default NewsList;
