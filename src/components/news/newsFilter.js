import React,{useRef} from "react";
import { useDispatch } from "react-redux";
import '../../styles/newsFilter.css'
import {fetchNews,updateFilter} from '../../slices/newsSlice'


function NewsFilter(){

    const dispatch = useDispatch();
    const searchTerm = useRef();
    const language = useRef();

    const searchNews = ()=>{
        dispatch(updateFilter({search : searchTerm.current.value,lang : language.current.value}))
        dispatch(fetchNews())
    }

    return (
            <div className="filter-container">
                <div className="searchwrapper">
                <div className="searchbox">
                    <div className="row">
                        <div className="input-wrapper">
                            <input type="text" ref={searchTerm} className="form-control" placeholder="Search by Keywords..."/>
                        </div>
                        <div className="input-wrapper">
                            <select className="form-control language" ref={language}>
                                <option value = "en">English</option>
                                <option value = "de">German</option>
                                <option value = "es">Spanish</option>
                                <option value = "fr">French</option>
                                <option value = "it">Italian</option>
                                <option value = "nl">Dutch</option>
                                <option value = "pt">Portuguese</option>
                                <option value = "ru">Russian</option>
                                <option value = "sv">Swedish</option>
                            </select>
                        </div>
                        <div Classname="input-wrapper">
                            <input type="button" onClick = {searchNews} class="btn btn-primary form-control" value="Search"/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default NewsFilter