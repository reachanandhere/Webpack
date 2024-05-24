import AnandImg from './anand.jpg'

function addImage(){
    const img  = document.createElement('img')
    img.alt = "Anand Image"
    img.width = 300
    img.src = AnandImg;
    const body = document.querySelector('body')
    body.appendChild(img)
}
export default addImage;