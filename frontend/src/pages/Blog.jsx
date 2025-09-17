// import React from "react";

// export default function Blog() {
//   const posts = Array.from({ length: 4 }).map((_, i) => ({
//     id: i + 1,
//     title: `Practical tip ${i + 1}`,
//     teaser: "Short insight about shipping products faster and smarter."
//   }));

//   return (
//     <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//       <h1 className="text-3xl font-bold">Blog</h1>
//       <p className="mt-2 text-muted">Notes from projects, research, and experiments.</p>

//       <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {posts.map((p) => (
//           <article key={p.id} className="card p-5 hover:shadow-md transition-shadow">
//             <h3 className="font-semibold">{p.title}</h3>
//             <p className="text-sm text-muted mt-1">{p.teaser}</p>
//             <div className="mt-3 text-sm text-[rgb(var(--link))]">Read more →</div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }
