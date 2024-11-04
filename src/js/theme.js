// initialize the theme

const storedTheme = localStorage.getItem("theme");

const systemThemeIsDark = window.matchMedia("(prefers-color-scheme:dark)").matches

const initialTheme = storedTheme ?? (systemThemeIsDark ? "dark" : "light")



// toggle theme between light and dark 
const toggleTheme = ()=>{
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme",newTheme);
    localStorage.setItem("theme",newTheme)

}

document.documentElement.setAttribute("data-theme",initialTheme)


// attach toggletheme to theme button click event 

window.addEventListener("DOMContentLoaded",()=>{
    const $themeBtn = document.querySelector("[data-theme-btn")
    if($themeBtn){
        $themeBtn.addEventListener("click",toggleTheme)
    }
})