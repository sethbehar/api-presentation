import { motion } from 'framer-motion';
import SlideLayout from '../components/SlideLayout';
import CodeSnippet from '../components/CodeSnippet';

const methods = [
  { name: 'GET', color: 'bg-emerald-500', desc: 'Read data' },
  { name: 'POST', color: 'bg-blue-500', desc: 'Create data' },
  { name: 'PUT', color: 'bg-amber-500', desc: 'Update data' },
  { name: 'DELETE', color: 'bg-red-500', desc: 'Remove data' },
];

const exampleRequest = `var client = new HttpClient();
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", token);

var response = await client.GetAsync(
    "https://api.itsacademy.com/api/v1/get-best-academy/"
);

var academy = await response.Content
    .ReadFromJsonAsync<Academy>();`;

const exampleResponse = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 2025,
  "name": "ITS Academy Cohort 2025",
  "startDate": "2025-08-25",
  "endDate": "2026-06-02",
  "students": "Isaac, Jordan, Kris, 
               Madalina, Matt, Mike, 
               Sam, Seth"
}`;

export default function RestDeepDive() {
  return (
    <SlideLayout>
      <div className="flex w-full max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-center"
        >
          <span className="mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Deep Dive
          </span>
          <h2 className="text-4xl font-bold text-white md:text-5xl">REST APIs</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 max-w-2xl text-center text-slate-400"
        >
          <span className="font-semibold text-blue-400">RE</span>presentational{' '}
          <span className="font-semibold text-blue-400">S</span>tate{' '}
          <span className="font-semibold text-blue-400">T</span>ransfer 
          
          {/* -- resources identified by
          URLs, manipulated through standard HTTP methods. */}
        </motion.p>

        {/* HTTP Methods */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {methods.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-2 rounded-lg glass px-4 py-2"
            >
              <span className={`inline-block h-3 w-3 rounded-full ${m.color}`} />
              <span className="font-mono text-sm font-semibold text-white">{m.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Request / Response examples */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-400"
            >
              Request
            </motion.h3>
            <CodeSnippet code={exampleRequest} language="C#" delay={0.55} />
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400"
            >
              Response
            </motion.h3>
            <CodeSnippet code={exampleResponse} language="JSON" delay={0.65} />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
