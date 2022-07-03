export default () => {
    //toggle body 
    let transitionLink = document.querySelector(`.js-menu-transition`);
    let screenPrizes = document.querySelector(`.screen--prizes`);

    transitionLink.addEventListener(`click`,  () => {
        document.body.classList.add('prizes--bg');

        setTimeout(function(){
            screenPrizes.classList.add('prizes--active');
        }, 1000)
       

    });

    document.querySelectorAll('.js-toggle').forEach(remove => {
        remove.addEventListener('click', (e) => {
            document.body.classList.remove('prizes--bg');
            screenPrizes.classList.remove('prizes--active');
        });
    });
};