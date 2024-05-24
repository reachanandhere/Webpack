import './hello-world-button.scss'
class HelloWorldButton {
    buttonCss = 'hello-world-button'
    render(){
        const button = document.createElement('button')
        button.innerHTML = 'Hello World!'
        button.classList.add(this.buttonCss)
        const body = document.querySelector('body')
        button.onclick=()=>{
            const p = document.createElement('p')
            p.innerHTML = "Hello World button clicked!"
            p.classList.add('hello-world-text')
            body.appendChild(p)
        }
       
        body.appendChild(button)
        
    }
}

export default HelloWorldButton;