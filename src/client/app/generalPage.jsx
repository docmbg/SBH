import React from 'react';
import ReactDOM from 'react-dom';
import ArticleList from './articleList.jsx';
import ContactsList from './contactsList.jsx';

class GeneralPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleBody : "",
            isArticlePage : false,
            isContactsPage : false,
            links: []
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Article_List_Page",
            CAMLViewFields: `<ViewFields><FieldRef Name='Title' /><FieldRef Name='Body' />
            <FieldRef Name='IsArticlePage' /><FieldRef Name='IsContactsPage' /></ViewFields>`,
            CAMLQuery: "<Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"
            +_this.props.pageTitle+
            "</Value></Eq></Where></Query>",
            completefunc: function (xData, Status) {
                let articleBody = "";
                let isArticlePage = false;
                let isContactsPage = false;
                articleBody = $(xData.responseXML).SPFilterNode("z:row").first().attr("ows_Body");
                isArticlePage = $(xData.responseXML).SPFilterNode("z:row").first().attr("ows_IsArticlePage") == "Yes" ? true : false;
                isContactsPage = $(xData.responseXML).SPFilterNode("z:row").first().attr("ows_IsContactsPage") == "Yes" ? true : false;
                _this.setState({
                    articleBody, isArticlePage,isContactsPage
                })
            }
        });
    }

    render() {
        console.log(this.state.images);
        let that = this;
        let dangerObject = {__html : that.state.articleBody};
        return (
            <div className="articleContainer">
                <div className="articleBody" dangerouslySetInnerHTML={dangerObject}>
                </div>
                <ArticleList pageTitle={that.props.pageTitle}/>
                <ContactsList pageTitle={that.props.pageTitle}/>
            </div>
        )
    }
}

export default GeneralPage;