const theme1 = document.querySelector('#theme-1');
const theme2 = document.querySelector('#theme-2');
const theme3 = document.querySelector('#theme-3');
const displayScreen = document.querySelector('#displayScreen');

const keys = document.querySelectorAll('.keys-normal');
let keypress;
const displayText=[];
let number="";
let operator=0;
let numberText;
let first=0;
let second=0;
let result=0;

let theme = localStorage.getItem('theme');

console.log(theme);
if(theme){
   if(theme=="1"){
    theme1.checked=true;
    theme2.style.opacity="0";
    theme3.style.opacity="0";
    theme1.style.opacity="100";
   }else if(theme=="2"){
    theme2.checked=true;
    theme1.style.opacity="0";
    theme3.style.opacity="0";
    theme2.style.opacity="100";
    // console.dir(theme2);
   }else if(theme=="3"){
    theme3.checked=true;
    theme2.style.opacity="0";
    theme1.style.opacity="0";
    theme3.style.opacity="100";
   }
}else{
    theme1.checked=true;
}

theme1.addEventListener('click',()=>{
    localStorage.setItem('theme',"1");
    theme2.style.opacity="0";
    theme3.style.opacity="0";
    theme1.style.opacity="100";
});
theme2.addEventListener('click',()=>{
    localStorage.setItem('theme',"2");
    theme1.style.opacity="0";
    theme3.style.opacity="0";
    theme2.style.opacity="100";
});
theme3.addEventListener('click',()=>{
    localStorage.setItem('theme',"3");
    theme2.style.opacity="0";
    theme1.style.opacity="0";
    theme3.style.opacity="100";
});

for (const key of keys) {
    key.addEventListener('click',(e)=>{
        keypress=key.children[0].innerText;
        
        if(!isNaN(keypress)){
            if(keypress=="0"){
                if(displayText.length>0){
                    if(operator===5){
                        displayText.splice(0,displayText.length);
                        operator=0;
                    }
                    displayText.push(keypress);
                    displayScreen.innerText="";
                    numberText="";
                    for (const text of displayText) {
                        numberText+=text;
                    }
                    
                }else{
                    numberText="0";
                }
                displayScreen.innerText=numberText;
            }else{
                if(operator===5){
                    displayText.splice(0,displayText.length);
                    operator=0;
                }
                displayText.push(keypress);
                displayScreen.innerText="";
                numberText="";
                for (const text of displayText) {
                    numberText+=text;
                }
                displayScreen.innerText=numberText;
                
            }
        }else{
            // console.log('Not Number');
            if(keypress==='DEL'){
                displayText.pop();
                numberText="";
                for (const text of displayText) {
                    numberText+=text;
                }
                if(numberText.length<=0){
                    numberText="0";
                }
                displayScreen.innerText=numberText;
            }else if(keypress==='.'){
                if(displayText.includes(".")!=true){
                    if(displayText.length>0){
                        displayText.push(keypress);
                        displayScreen.innerText="";
                        numberText="";
                        for (const text of displayText) {
                            numberText+=text;
                        }
                    }else{
                        displayText.push("0");
                        displayText.push(".");
                        displayScreen.innerText="";
                        numberText="";
                        for (const text of displayText) {
                            numberText+=text;
                        }
                    }
                    displayScreen.innerText=numberText;
                }
               
            }else if(keypress==='+'){
                operator=1;
                getOperation();
            }else if(keypress==='-'){
                operator=2;
                getOperation();
            }else if(keypress==='X'){
                operator=3;
                getOperation();
            
            }else if(keypress==='/'){
                operator=4;
                getOperation();
            }else if(keypress==='='){
                setResult();
                operator=5;
                
            }else if(keypress==='RESET'){
                operator=0;
                displayText.splice(0,displayText.length);
                numberText="0";
                displayScreen.innerText=numberText;
            }
        }
    });
}

const getOperation=()=>{
    first = numberText;
    displayText.splice(0,displayText.length);
}
const setResult=()=>{
    second = numberText;
    if(operator===1){
        result=parseFloat(first)+parseFloat(second);
    }else if(operator===2){
        result=parseFloat(first)-parseFloat(second);
    }else if(operator===3){
        result=parseFloat(first)*parseFloat(second);
    }else if(operator===4){
        result=parseFloat(first)/parseFloat(second);
    }
    numberText=result;
    displayScreen.innerText=numberText;

}

