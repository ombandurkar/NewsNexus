import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parseData = await data.json();

        props.setProgress(70);

        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {  //used in place of cdm
        updateNews();
        /* eslint-disable-next-line*/
    }, [])

    const fetchMoreData = async () => {

        setPage(page + 1);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parseData = await data.json();

        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
    }

    return (
        <>
            <h1 className='text-center fw-bolder' style={{ margin: '35px 0px', marginTop: '90px' }}>NewsNexus - Top {(props.category.charAt(0).toUpperCase()) + props.category.slice(1)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">


                    <div className="row">
                        {/*isse apne saare objects log hjaayege, we have in total of 20 obejcts to vo saare ke saare log hojaayegge*/}

                        {/* we are able to iterate over all our article objects with this */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDLUgPm6eqlc3xZzykaaMRKvUUlMVaaiUlA&usqp=CAU"} newsUrl={element.url} author={element.author ? element.author : 'unknown'} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
    apiKey: process.env.REACT_APP_NEWS_API
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
