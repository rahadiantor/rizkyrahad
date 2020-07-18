import fs from "fs/promises";
import { join } from "path";

import { GetStaticProps } from "next";
import Head from "next/head";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

export default function Home({ file, posts }) {
  const formOptions = {
    label: "Home Page",
    fields: [{ name: "title", component: "text" }],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {/**
           * Render the title from `home.json`
           */}
          {data.title}
        </h1>
      </main>

      {posts.map((post) => (
        <pre key={post.title}>{JSON.stringify(post, null, 2)}</pre>
      ))}

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  const narrativeFiles = await fs.readdir(
    join(process.cwd(), "content", "narrative")
  );
  const narratives = await Promise.all(
    narrativeFiles.map((fileName) =>
      fs.readFile(join(process.cwd(), "content", "narrative", fileName), "utf8")
    )
  );

  if (preview) {
    const githubPreviewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
    console.log({ githubPreviewProps });
    return {
      ...githubPreviewProps,
      props: {
        ...githubPreviewProps.props,
        posts: narratives.map((text) => JSON.parse(text)),
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
      posts: narratives.map((text) => JSON.parse(text)),
    },
  };
};
