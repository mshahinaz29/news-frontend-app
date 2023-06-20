import React from 'react'

const Article = ({article}) => {
  return (
        <article className="flex max-w-xl flex-col items-start justify-between">
                            
            <a href={article.url}>
                <img className="max-h-56 m-0 rounded-t object-cover lazy" 
                src={article.thumbnail ?? "https://www.cimspa.co.uk/globalassets/images-cimspa/news-images/_news-placeholder-salmon-navy-1920.png" } width="960" height="500" alt="This post thumbnail" />
            </a>
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={article.published_at} className="text-gray-500">
                {article.published_at}
                </time>
                <a
                href='#'
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                {article.category ?? 'Uncategorized'}
                </a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href={article.url}>
                    <span className="absolute inset-0" />
                    {article.title}
                </a>
                </h3>
                <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" dangerouslySetInnerHTML={{ __html: article.description }}></div>
                {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p> */}
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
                <img src={article.author_image} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                    <a href='#'>
                    <span className="absolute inset-0" />
                    {article.source_name}
                    </a>
                </p>
                <p className="text-gray-600">{article.author}</p>
                </div>
            </div>
        </article>
  )
}

export default Article