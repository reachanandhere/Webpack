import addImage from './add-image.js';
import HelloWorldButton from './components/Hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';
const helloWorldBtn = new HelloWorldButton()
const heading = new Heading()
addImage()
heading.render()
helloWorldBtn.render()


