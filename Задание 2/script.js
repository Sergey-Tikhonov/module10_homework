/*Задание 2.

Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. */

//P.S. Добавил немного красоты, надеюсь оцените ;)

 const btn = document.querySelector('.j-btn-test');

 btn.addEventListener('click', () => {
     
     alert(`Ширина экрана: ${window.screen.width}\nВысота экрана: ${window.screen.height}`); 
     let timerId = setInterval(() => btn.classList.add('btn--magic'), 1000);
     setTimeout(() => { clearInterval(timerId); btn.classList.remove('btn--magic')  }, 3000);
 });