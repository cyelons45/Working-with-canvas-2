// MOBILE NAVIGATION
document.querySelector('#icon-mini').addEventListener('click',function(){
    document.getElementById('icon').classList.toggle('ion-navicon-round')
    document.getElementById('navi').classList.toggle('close')
})

// NAVIGATION SELECTION
document.querySelector('#navi').addEventListener('click',function(e){
    let clicked= (e.target.closest('.navigation'));
     document.querySelectorAll('.navigation').forEach(function(cur){
        (cur.style.color='seashell') 
    })
       clicked.style.color='red'
})

document.querySelector('.mission').style.color='red'