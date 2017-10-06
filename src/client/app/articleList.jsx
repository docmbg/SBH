import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'https://hpe.sharepoint.com/teams/CABO-Sofia/MainSite/src/client/index.aspx/';
class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Articles",
            CAMLViewFields: `<ViewFields><FieldRef Name='Title' /><FieldRef Name='Link_Title' />
            <FieldRef Name='Posted_Date' /><FieldRef Name='Thumbnail' />
            <FieldRef Name='Parent_Site' /></ViewFields>`,
            CAMLQuery: "<Query><Where><Eq><FieldRef Name='Parent_Site' /><Value Type='Text'>"
            +_this.props.pageTitle+
            "</Value></Eq></Where></Query>",
            completefunc: function (xData, Status) {
                let articles = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    let current = $(this);
                    articles.push({
                        "imageSrc" : current.attr("ows_Thumbnail"),
                        "title": current.attr("ows_Link_Title"),
                        "link": current.attr("ows_Title"),
                        "date": current.attr("ows_Posted_Date").split(" ").join("T")
                    });
                });
                articles = articles.sort(function (a, b) {
                    return new Date(b["date"]).getTime() - new Date(a["date"]).getTime();
                })
                _this.setState({
                    articles
                });
            }
        });

    }

    render() {
        let that = this;
        if(this.state.articles.length < 1){ //escape null
            return (
                <div>
                </div>
            )
        }
        return (
            <div>
                <ul>
                    {
                        that.state.articles.map(function (e, i) {
                            let imgUrl = { backgroundImage : `url('${e["imageSrc"]}')`}
                            return (
                                <li key={`${that.props.pageTitle}-article-${i}`}>
                                    <div className="articleList-container">
                                        <div className="articleList-image" style={imgUrl}>
                                        </div>
                                        <div className="articleList-details">
                                            <p className="articleList-title">{e["title"]}</p>
                                            <p><span className="articleList-date">{new Date(e["date"]).toDateString()}</span></p>
                                            <p className="articleList-link"><a href={`${baseURL}?type=article&title=${e["link"]}`} target="_blank">Learn More</a></p>
                                        </div>
                                    </div>
                                </li>
                            );
                        }).filter(function (e) {
                            return e != null;
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ArticleList;