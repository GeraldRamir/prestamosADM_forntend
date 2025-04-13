self.addEventListener("install", (event) => {
    console.log("Service Worker Instalado");
  });
  
  self.addEventListener("activate", (event) => {
    console.log("Service Worker Activado");
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
  });
  