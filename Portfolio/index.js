const upBtn = document.querySelector("#navigate-top-btn")
const dnBtn = document.querySelector("#navigate-bottom-btn")
const themeBtn = document.querySelector("#theme-btn")

//navigation to top and bottom of page using buttons
upBtn.addEventListener('click', function(){
  scrollTo({
    top: 0
  })
})
dnBtn.addEventListener('click', function(){
  scrollTo({
    top: document.body.scrollHeight
  })
})


// adding and removing icons-text according to size 
window.addEventListener("resize", function(){
  let width = window.innerWidth;
  let insta = document.querySelector(".instagram")
  let tele = document.querySelector(".telegram")
  let linkedin = document.querySelector(".linkedin")
  if (width < 1226) {
    insta.innerHTML = `<img class="icon-social" src="icons/instagram.png" alt="instagram-new"/>
    <p class="text-social">Instagram</p>`
    tele.innerHTML = `<img class="icon-social" src="icons/linkedin.png" alt="linkedin"/>
    <p class="text-social">LinkedIn</p>`
    linkedin.innerHTML = `<img class="icon-social" src="icons/telegram.png" alt="telegram-app"/>
    <p class="text-social">Telegram</p>`
  }
  else if (width > 1226) {
    insta.innerHTML = `<img class="icon-social" src="icons/instagram.png" alt="instagram-new"/>`
    tele.innerHTML = `<img class="icon-social" src="icons/linkedin.png" alt="linkedin"/>`
    linkedin.innerHTML = `<img class="icon-social" src="icons/telegram.png" alt="telegram-app"/> `
  }
})

//fixing border overlap of contact me at certain width
window.addEventListener("resize", function(){
  let width = window.innerWidth;
  let extraLinksBox = document.querySelector(".section6");
  
  if(width < 770 && width >= 612){
    extraLinksBox.style.borderLeftStyle = "none";
    extraLinksBox.style.borderRadius = "0px 20px 20px 0px";
  } else if (width < 612) {
    extraLinksBox.style.borderLeftStyle = ""; // Reset to default for widths <= 612px
    extraLinksBox.style.borderRadius = ""; // Reset to default for widths <= 612px
  } else {
    extraLinksBox.style.borderLeftStyle = ""; // Reset to default for widths >= 768px
    extraLinksBox.style.borderRadius = ""; // Reset to default for widths >= 768px
  }
});