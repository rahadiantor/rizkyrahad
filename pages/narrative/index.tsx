import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

import { join, readdir } from "../../util/fs";

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
        <h1 className="title">{data.title}</h1>
        <span>{data.description}</span>

        <ul>
          <li>
            <Link href={`/`}>
              <a>{data.documentaryLabel}</a>
            </Link>
          </li>
          <li>
            <Link href={`/narrative`}>
              <a>{data.narrativeLabel}</a>
            </Link>
          </li>
          <li>
            <Link href={`/about`}>
              <a>{data.aboutLabel}</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <a href={data.instagramLink}>Instagram</a>
          </li>
          <li>
            <a href={data.linkedinLink}>LinkedIn</a>
          </li>
          <li>
            <a href={data.twitterLink}>Twitter</a>
          </li>
          <li>
            <a href={data.email}>Email</a>
          </li>
        </ul>

        {posts.map((post) => (
          <Link href={`/narrative/${post.slug}`}>
            <a>
              <pre>{JSON.stringify(post, null, 2)}</pre>
            </a>
          </Link>
        ))}
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
  const narrativeFileNames = await readdir(join("./content/narrative"));

  const posts = await Promise.all(
    narrativeFileNames.map((fileName) =>
      import(`../../content/narrative/${fileName}`).then((mod) => mod.default)
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
        posts,
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
        data: (await import("../../content/home.json")).default,
      },
      posts,
    },
  };
};
