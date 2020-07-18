import fs from "fs";
import { join } from "path";

import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import Link from "next/link";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";
import { getPublicPath } from "../util/getPaths";

export default function Documentary({ file }) {
  const formOptions = {
    label: `Documentary: ${file.data.title}`,
    fields: [
      { name: "title", component: "text" },
      { name: "slug", component: "text" },
      { name: "description", component: "textarea" },
      { name: "role", component: "text" },
      //   {
      //     name: "thumbnail",
      //     component: "image",
      //     uploadDir: () => getPublicPath("documentary"),
      //     parse: (fileName) => getPublicPath("documentary", fileName),
      //   },
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  params,
}) {
  const fileRelativePath = `content/documentary/${params.postId}.json`;
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath,
        data: (await import(`../${fileRelativePath}`)).default,
      },
    },
  };
};

export const getStaticPaths = async function () {
  const documentaries = fs.readdirSync(
    join(process.cwd(), "content", "documentary")
  );
  return {
    paths: documentaries.map((fileName) => ({
      params: {
        postId: fileName.split(".")[0],
      },
    })),
    fallback: false,
  };
};
