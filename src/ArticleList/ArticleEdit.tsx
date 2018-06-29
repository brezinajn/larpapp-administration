import * as React from 'react'
import {ChangeEvent, FormEvent} from 'react'
import {UploadStates} from "../ArticleStateContainer"

interface IArticleEditProps {
    article: IArticle,
    uploadState: string

    onTitleChanged(title: string): void

    onContentChanged(content: string): void

    onFileChanged(file: File | null): void

    onSubmitClicked(): void
}

export default function ArticleEdit({
                                        article,
                                        uploadState,
                                        onTitleChanged,
                                        onContentChanged,
                                        onFileChanged,
                                        onSubmitClicked
                                    }: IArticleEditProps) {
    return <>
        <label>Title</label><input id="title" type="text" value={article.title}
                                   onInput={onTextInputChangedFactory(onTitleChanged)}/><br/>
        <label>Content</label><textarea value={article.content}
                                        onInput={onTextInputChangedFactory(onContentChanged)}/><br/>
        <label>Image</label><input type="file" onChange={onFileInputChangedFactory(onFileChanged)}/><input
            type="checkbox" checked={uploadState === UploadStates.FINISHED} disabled={true}/>
        <UploadingMessage
            visible={uploadState === UploadStates.STARTED}
        />
        <ErrorMessage visible={uploadState === UploadStates.ERROR}/>
        <br/>
        <button onClick={onSubmitClicked}>Submit</button>
    </>


}


interface IVisibleProps {
    visible: boolean
}

function ErrorMessage({visible}: IVisibleProps) {
    if (visible) {
        return <span>Error!</span>
    } else {
        return null
    }
}


function UploadingMessage({visible}: IVisibleProps) {
    if (visible) {
        return <span>Uploading...</span>
    } else {
        return null
    }
}

function onFileInputChangedFactory(onFileChanged: (file: File | null) => void) {
    return (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || []
        onFileChanged(files[0])
    }

}

function onTextInputChangedFactory(onTitleChanged: (title: string) => void) {
    return (e: FormEvent<any>) => {
        const title = e.currentTarget.value
        onTitleChanged(title)
    }
}