const buttons = document.querySelectorAll('.cart')
buttons.forEach(button =>{
    const answerButton = button.querySelector('.button1')
    const answer = button.querySelector('span')

    answerButton.addEventListener('click', ()=>{
        answer.classList.toggle('look')
        const contains = answer.classList.contains('look')

        answerButton.innerHTML = contains ?'скрыть ответ':'показать ответ'
        answerButton.style.backgroundColor = contains ?'red':'gray'
    })
})
