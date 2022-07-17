import React from "react";
import '../../styles/newsCard.css'


function NewsCard({item}){

    const date = new Date(item.publishedAt)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const defaultImg = 'https://www.reuters.com/pf/resources/images/reuters/reuters-default.png?d=99'
    return (
        <>
        <figure className="article">
            <div className="image"><img src={item?.urlToImage || defaultImg} alt="ls-sample1" /></div>
            <figcaption>
                <div className="date"><span className="day">{day}</span><span className="month">{month}</span></div>
                <h3>{item.title}</h3>
                <p>{item.description}
                </p>
                <footer>
                {item.author && <div className="author"><i className="ion-clipboard"></i>{item.author}</div>}
                {item.source?.name &&<div className="source"><i className="ion-bookmark"></i>{item.source.name}</div>}
                </footer>
            </figcaption>
            </figure>
        </>
    )
}

export default NewsCard