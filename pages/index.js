import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shahbaz Khan | IT × AI × Automation</title>
        <meta name="description" content="Shahbaz Khan — IT Operations, Full-Stack Development, AI Integration and Automation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <iframe
        src="/portfolio.html"
        title="Shahbaz Khan 3D Portfolio"
        style={{ width: '100vw', height: '100vh', border: 0, display: 'block' }}
      />
    </>
  );
}
