import { GetStaticProps } from "next";
import Head from "next/head";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

export default function Home({ file }) {
  const formOptions = {
    label: "About Page",
    fields: [{ name: "title", component: "text" }],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">About</h1>
        <span>{data.description}</span>
        <img src="/about.jfif" />

        <div dangerouslySetInnerHTML={{ __html: data.aboutHTML }} />

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>

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
  if (preview) {
    const githubPreviewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/about.json",
      parse: parseJson,
    });
    console.log({ githubPreviewProps });
    return {
      ...githubPreviewProps,
      props: {
        ...githubPreviewProps.props,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/about.json",
        data: (await import("../content/about.json")).default,
      },
    },
  };
};
