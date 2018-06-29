import * as moment from 'moment'
import * as React from 'react'
// import {storage} from "firebase"

interface IArticleItemProps {
    article: IArticle,
    articleId: string,
    onDeleteClicked: (articleId: string) => void
}

export default function ArticleItem({article, articleId, onDeleteClicked}: IArticleItemProps) {
    let date
    if (article.createdAt) {
        date = article.createdAt.toDateString() + " " + article.createdAt.toTimeString()
        date = moment(article.createdAt).format("D.M.Y HH:mm:ss")
    } else {
        date = "Pending..."
    }

    return (<div className="article-row flex">
        <div className="datetime">{date}</div>
        <div className="title">{article.title}</div>
        <div className="perex">{article.content.substr(0, 100).concat("...")}</div>
        <button onClick={onButtonClickedFactory(articleId, onDeleteClicked)} className="delete pink-btn">Delete</button>
    </div>)
}


function onButtonClickedFactory(itemId: string, onClicked: (itemId: string) => void) {
    return (e: any) => {onClicked(itemId)}
}
