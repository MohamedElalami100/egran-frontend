import imagesData from '../assets/ImagesData.json'

function getRandImageGroup(prev) {
    const rand = Math.floor(Math.random() * imagesData.length)
    if(rand === prev)
        return getRandImageGroup(prev);
    return imagesData[rand] ;
}

export default getRandImageGroup