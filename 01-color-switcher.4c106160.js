!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function r(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}e.setAttribute("disabled",""),t.addEventListener("click",(function(){e.removeAttribute("disabled"),t.setAttribute("disabled",""),r(),n=setInterval((function(){r()}),1e3)})),e.addEventListener("click",(function(){e.setAttribute("disabled",""),t.removeAttribute("disabled"),clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.4c106160.js.map