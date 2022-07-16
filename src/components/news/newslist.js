import React, {useState, useEffect}  from "react";
import { useSelector,useDispatch } from "react-redux";
import NewsCard from './newsCard'
import {fetchNews} from '../../slices/newsSlice'
import '../../styles/newsList.css'

function NewsList(){

    const newsItems = useSelector(state => state.news.enitities.articles)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchNews({search : "",lang : ""}))
    }, [])

    return (
        <>
        <div className="news-list">
            {newsItems && newsItems.map((news,i) => (
                <NewsCard key = {i} item={news}/>
            ))}
        </div>
        </>
    )
}

export default NewsList
