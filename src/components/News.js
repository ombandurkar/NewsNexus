import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general',
        apiKey: process.env.REACT_APP_NEWS_API
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    //articles ek variable hai which is an array, and hum isko access kar sakte hai in the constructor using "this.article"
    constructor() {  //ye constirctor newsItem ka hai, since abhi yaha par current 3 news items hai to ye constutor 3 baar call hoga
        super(); //hamesha super class ke comsturctor ko hee call karna hai
        console.log("hello from news component");

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }
    async componentDidMount() {
        console.log("ye baadme aayega, sabse pehele constructor, fir render, and then cdm aayega");
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.props.setProgress(40);
        let parseData = await data.json();
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    }

    // handleNextClick = async () => {
    //     console.log('Next');

    //     if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0a32fd9b8b94b04a4182b2cbe726811&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //         this.setState({ loading: true })
    //         let data = await fetch(url);
    //         let parseData = await data.json();
    //         console.log(parseData);

    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parseData.articles,
    //             loading: false
    //         })
    //     }
    //     else {

    //     }
    // }

    // handlePrevClick = async () => {
    //     console.log('Prev');

    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0a32fd9b8b94b04a4182b2cbe726811&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     console.log(parseData);

    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseData.articles,
    //         loading: false
    //     })
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center fw-bolder my-3'>NewsMonekey - Top {(this.props.category.charAt(0).toUpperCase()) + this.props.category.slice(1)} Headlines</h1>
                {this.state.loading &&  <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">


                        <div className="row">
                            {/*isse apne saare objects log hjaayege, we have in total of 20 obejcts to vo saare ke saare log hojaayegge*/}

                            {/* we are able to iterate over all our article objects with this */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDLUgPm6eqlc3xZzykaaMRKvUUlMVaaiUlA&usqp=CAU"} newsUrl={element.url} author={element.author?element.author:'unknown'} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
