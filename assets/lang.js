// Idioma da página: o escolhido antes, senão o do navegador (português → PT, qualquer outro → EN)
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("gfc-lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "pt").toLowerCase().indexOf("pt") === 0 ? "pt" : "en");
  root.setAttribute("data-lang", lang);
  root.lang = lang === "pt" ? "pt-BR" : "en";

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".lang");
    if (!button) return;
    button.addEventListener("click", function () {
      lang = root.getAttribute("data-lang") === "en" ? "pt" : "en";
      root.setAttribute("data-lang", lang);
      root.lang = lang === "pt" ? "pt-BR" : "en";
      try { localStorage.setItem("gfc-lang", lang); } catch (e) {}
    });
  });
})();
