import{j as e,m as a}from"./index-DWdJOSNk.js";import{S as n}from"./SlideLayout-B4AzNINl.js";import{C as s}from"./CodeSnippet-Dc69fSh6.js";const l=[{name:"GET",color:"bg-emerald-500",desc:"Read data"},{name:"POST",color:"bg-blue-500",desc:"Create data"},{name:"PUT",color:"bg-amber-500",desc:"Update data"},{name:"DELETE",color:"bg-red-500",desc:"Remove data"}],o=`var client = new HttpClient();
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", token);

var response = await client.GetAsync(
    "https://api.itsacademy.com/api/v1/get-best-academy/"
);

var user = await response.Content
    .ReadFromJsonAsync<User>();`,d=`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 2025,
  "name": "ITS Academy Cohort 2025",
  "startDate": "2025-08-25",
  "endDate": "2026-06-02",
  "students": "Isaac, Jordan, Kris, Madalina, Matt, Mike, Sam, Seth"
}`;function x(){return e.jsx(n,{children:e.jsxs("div",{className:"flex w-full max-w-5xl flex-col items-center",children:[e.jsxs(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-2 text-center",children:[e.jsx("span",{className:"mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400",children:"Deep Dive"}),e.jsx("h2",{className:"text-4xl font-bold text-white md:text-5xl",children:"REST APIs"})]}),e.jsxs(a.p,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"mb-8 max-w-2xl text-center text-slate-400",children:[e.jsx("span",{className:"font-semibold text-blue-400",children:"RE"}),"presentational"," ",e.jsx("span",{className:"font-semibold text-blue-400",children:"S"}),"tate"," ",e.jsx("span",{className:"font-semibold text-blue-400",children:"T"}),"ransfer -- resources identified by URLs, manipulated through standard HTTP methods."]}),e.jsx("div",{className:"mb-8 flex flex-wrap justify-center gap-3",children:l.map((t,i)=>e.jsxs(a.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.4,delay:.2+i*.1},className:"flex items-center gap-2 rounded-lg glass px-4 py-2",children:[e.jsx("span",{className:`inline-block h-3 w-3 rounded-full ${t.color}`}),e.jsx("span",{className:"font-mono text-sm font-semibold text-white",children:t.name}),e.jsx("span",{className:"text-xs text-slate-500",children:t.desc})]},t.name))}),e.jsxs("div",{className:"grid w-full grid-cols-1 gap-4 md:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx(a.h3,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},className:"mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-400",children:"Request"}),e.jsx(s,{code:o,language:"C#",delay:.55})]}),e.jsxs("div",{children:[e.jsx(a.h3,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.6},className:"mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400",children:"Response"}),e.jsx(s,{code:d,language:"JSON",delay:.65})]})]})]})})}export{x as default};
