export const HtmlContent = (content, className='')=>{
    return <div dangerouslySetInnerHTML={{__html: content}} className={className}></div>;
}
