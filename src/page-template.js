// create the about section
const generateAbout = aboutText => {
   if (!aboutText){
      return '';
   }

   return `
      <section class='my-3' id='about'>
         <h2 class= 'text-dark bg-primary p-2 display-inline-block">About Me</h2>
         <p>${about}</p>
      </section>
   `;

};

module.exports = templateData => {
   // console.log(templateData);
   const {projects, about, ...header} = templateData;
  
   return `
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset = "UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
   </head>

   <body>
      <header>
         <div class='container flex-row justify-space-between align-center py-3'>
            <h1 class='page-title text-secondary bg-dark py-2 px-3'>${header.name}</h1>

            <nav class='flex-row'>
            <a class='ml-2 my-1 px-2 py-1 bg-secondary text-dark' href="https://github.com/${header.github}">Github</a>
            </nav>
         </div>
      </header>
      <main class='container my-5'>
         ${(generateAbout(about))}
      
      </main>
      <footer class='container text-center py-3'>
         <h3 class='text-dark'>&copy; ${new Date().getFullYear()} by ${header.name}</h3>
      </footer>
  </body>
  </html>
   `;
};
