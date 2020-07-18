import fs from "fs";
import { join } from "path";

import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import Link from "next/link";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

export default function Narrative({ file }) {
  const formOptions = {
    label: "Narrative",
    fields: [
      { name: "title", component: "text" },
      { name: "slug", component: "text" },
      { name: "description", component: "textarea" },
      { name: "role", component: "text" },
    ],
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <b>{data.role}</b>
    </>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  params,
}) {
  const path = `content/narrative/${params.postId}.json`;
  console.log({ path });
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: path,
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: path,
        data: (await import(`../${path}`)).default,
      },
    },
  };
};

export const getStaticPaths = async function () {
  const narratives = fs.readdirSync(
    join(process.cwd(), "content", "narrative")
  );
  return {
    paths: narratives.map((fileName) => ({
      params: {
        postId: fileName.split(".")[0],
      },
    })),
    fallback: false,
  };
};
