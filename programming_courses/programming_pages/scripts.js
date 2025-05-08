const allcards = [
    {id:1, title:"C++_course",img:"../items/c++_course.png",link:"c++.html",
    text_title:"C++ from begginer to master"},

    {id:2, title:"java_course",img:"../items/java_course.jpeg",link:"java.html",
    text_title:"Industrial-Grade Java Development "},

    {id:3, title:"python_course",img:"../items/python_course.jpg",link:"python.html",
    text_title:"Python: Your Swiss Army Knife for Coding "},

    {id:4, title:"php_course",img:"../items/php_course.png",link:"php.html",
    text_title:"PHP: Web Wizardry Unleashed "},

    {id:5, title:"javascript_course",img:"../items/java_script_course.jpg",link:"java_script.html",
    text_title:"JavaScript: The Web's Native Tongue"},
   ];
let current_index = 0 ;
const visibleCardsCount = 3 ;

function render_cards(){
    const container =document.querySelector ('.slider_cards_container')
    container.innerHTML= '';
    
    const visible_cards=[];

    for(let i =0;i< visibleCardsCount;i++){
        let card_index = (current_index+i)% allcards.length ;
        visible_cards.push(allcards[card_index]);
    }

    visible_cards.forEach(card => {
        container.innerHTML+=`
        <div class="slider_card" onclick="window.location.href='${card.link}'">
        <div class="slider_card_img">
        <img src="${card.img}" alt="${card.title}">
        </div>
        <div class="slider_card_text">
        <h1>${card.text_title}</h1>
        </div>
        </div>`
    });
}

function next_slide(){
    current_index = (current_index +1)% allcards.length;
    render_cards();
}
function prev_slide(){
    current_index = (current_index-1+allcards.length)% allcards.length;
    render_cards();
}
document.addEventListener('DOMContentLoaded', () => {
    render_cards();
    
    // Add event listeners to buttons
    const buttons = document.querySelectorAll('.slider button');
    buttons[0].addEventListener('click', prev_slide);  // Previous button (<)
    buttons[1].addEventListener('click', next_slide);  // Next button (>)
});
render_cards();
document.getElementById('enroll-btn').onclick = function() {
    this.textContent = "Thanks for enrolling!";
    this.style.backgroundColor = "#d1a5fd";
    this.style.color = "black";
    this.disabled = true;
};