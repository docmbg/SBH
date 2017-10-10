import React from 'react';
import ReactDOM from 'react-dom';
import ImageCollection from './imageCollection.jsx';


class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleBody : "",
            images: []
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Articles",
            CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Body' /></ViewFields>",
            CAMLQuery: "<Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"
            +_this.props.articleTitle+
            "</Value></Eq></Where></Query>",
            completefunc: function (xData, Status) {
                let articleBody = "";
                articleBody = $(xData.responseXML).SPFilterNode("z:row").first().attr("ows_Body");
                _this.setState({
                    articleBody
            })
                
            }
        });
        $().SPServices({
            operation: "GetListItems",
            listName: "Article_Images",
            CAMLQueryOptions: '<QueryOptions><ViewAttributes Scope="Recursive"/></QueryOptions>',
            CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='FileRef' /><FieldRef Name='Title' /><FieldRef Name='Body' /></ViewFields>",
            CAMLQuery: "<Query><Where><Contains><FieldRef Name='FileRef' /><Value Type='Text'>"
            +_this.props.articleTitle+
            "</Value></Contains></Where></Query>",
            completefunc: function(xData,Status){
                let images = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function(){
                    images.push($(this).attr("ows_FileRef"));
                })
                images=images.map(e => "https://hpe.sharepoint.com/" + e.split(";#")[1])
                console.log(images);
                _this.setState({
                    images
                })
            }
        });

    }

    render() {
        console.log(this.state.images)
        let that = this;
        let dangerObject = {__html : that.state.articleBody};
        return (
            <div className="articleContainer">
            <div className="articleHeader">
                {this.props.articleHeader}
            </div>
                <div className="articleBody" dangerouslySetInnerHTML={dangerObject}>
                </div>
                <ImageCollection images={that.state.images}/>
            </div>
        )
    }
}

export default ArticlePage;