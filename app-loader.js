class AppLoader extends HTMLElement{
    attributes = {
        z: 1, 
        wait: 1000, 
        background: 'linear-gradient(90deg, #000000, #404040)',
        balls: [1, 2, 3, 4, 5],
        message: '', requests: [], 
    };
    constructor(){
        super();
    }
    async connectedCallback(){
        this.defineAttributes();
        const {requests, wait} = this.attributes;
        if(requests.length == 0 && wait == 0){
            return false;
        }
        const shadow_root = this.attachShadow({mode: 'open'});
        shadow_root.appendChild(this.defineStyleNode());
        shadow_root.appendChild(this.defineContentNode());
        if(requests.length > 0){
            const responses = requests.map(url => fetch(url));
            responses.push(this.wait(this.attributes.wait));
            await Promise.all(responses);
            shadow_root.host.remove();
        }else{
            await this.wait(wait); 
            shadow_root.host.remove();
        }
    }
    defineAttributes(){
        ['background', 'z', 'message', 'requests', 'wait'].forEach(attribute => {
            if(!this.hasAttribute(attribute)){ return false; }
            if(attribute === 'requests'){
                this.attributes.requests = this.getAttribute('requests').split(',').map(request => request.trim());
            }else if(attribute === 'wait'){
                this.attributes.wait = parseInt(this.getAttribute(attribute));
            }else{
                this.attributes[attribute] = this.getAttribute(attribute);
            }
        });
    }
    defineContentNode(attributes){
        const html = `
        <div class="overlay">
            <div class="animation">
            ${this.attributes.balls.map(ball => `<div id="ball${ball}" class="balls"></div>`).join('')}
            </div>
            <div class="message">${this.attributes.message}</div>
        </div>
        `;
        const placeholder = document.createElement("div");
        placeholder.innerHTML = html;
        const node = placeholder.firstElementChild;
        return node;
    }
    defineStyleNode(){
        const style = document.createElement("style");
        style.textContent = `
        .overlay{
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            z-index: ${this.attributes.z};
            background: ${this.attributes.background};
            color: white;
            display: grid;
            gap: 10vh;
            place-items: center;
            font-family: sans-serif;
        }
        .animation{
            align-self: end;
            display: flex;
            gap: 5vw;
        }
        .balls {
            background-color: white;
            height: 5vw;
            width: 5vw;
            min-height: 10px;
            min-width: 10px;
            max-height: 30px;
            max-width: 30px;
            border-radius: 50%;
            animation: bounce 1s infinite, fade 1s infinite;
        }
        ${this.attributes.balls.map(ball => `#ball${ball}{animation-delay: ${ball/10}s;}`).join('')}
        @keyframes bounce {
           0% { transform: translateY(0); }
           40% { transform: translateY(5vw); }
           60% { transform: translateY(-5vw);  }
           80%{ transform: translateY(0);  }
        }
        @keyframes fade {
            0% { opacity: 0.6; }
            40% { opacity: 0.2; }
            60% { opacity: 0.2; }
            80%{ opacity: 0.6; }
        }
        .message{
            align-self: start;
        }
        `;
        return style;
    }
    async wait(ms){
        return new Promise(resolve => {
            setTimeout(function(){
                resolve();
            }, ms);
        });
    }
}
customElements.define('app-loader', AppLoader);
