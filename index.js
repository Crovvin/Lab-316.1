var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add('flex-ctr');

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height ='100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

menuLinks.forEach(object => {
  const menu = document.createElement("a");
  menu.href = object.href;
  menu.text = object.text;
  topMenuEl.appendChild(menu);
})

const topMenuLinks = topMenuEl.querySelectorAll('a'); 
topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  let code = event.target;
  if(code.tagName !== 'A'){
    return;
  }
  const subLinkSearch = menuLinks.find(function(object) {
    return object.text === code.innerText.toLowerCase();
  });

  if(!code.classList.contains('active') && subLinkSearch.subLinks !== undefined){
    topMenuLinks.forEach(object => {
      object.classList.remove('active')
    })
    code.classList.add('active');
    buildSubMenu(subLinkSearch.subLinks)
    subMenuEl.style.top = '100%';
  } else{
    topMenuLinks.forEach(object => {
      object.classList.remove('active')
    })
    if(code.textContent === 'about'){
    mainEl.innerHTML = `<h1>About</h1>`
    }
    subMenuEl.style.top = '0';
  }
});

subMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  let code2 = event.target;
  if(code2.tagName !== 'A'){
    return;
  }
  subMenuEl.style.top = '0';
  topMenuLinks.forEach(object => {
    object.classList.remove('active')
  })
  mainEl.innerHTML = `<h1>${code2.textContent}</h1>`;
})

function buildSubMenu(subLink){
  subMenuEl.textContent = '';
  subLink.forEach(object => {
    const menu = document.createElement("a");
    menu.href = object.href;
    menu.text = object.text;
    subMenuEl.appendChild(menu);
  })
}