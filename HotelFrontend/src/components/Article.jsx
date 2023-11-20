
export const Article = ({post}) => {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between animate__animated animate__swing">
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 white group-hover:white">
          {post.titulo}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 white white" dangerouslySetInnerHTML={{ __html: post.descripcion }}>
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="text-sm leading-6">
          <img src="data:image/png;base64,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"/>
            <p className="font-semibold white">
              <a href="#">
                <span className="absolute inset-0 white"></span>
                {post.autor}
              </a>
            </p>
          </div>
        </div>
      </article>
  )
}
