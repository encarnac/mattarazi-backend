// @ts-nocheck
import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { buildConfig } from "payload/config";

import Logo from "./graphics/Logo.jsx";
import Icon from "./graphics/Icon.jsx";
import BeforeDashboard from "./components/BeforeDashboard.jsx";
import BeforeLogin from "./components/BeforeLogin.jsx";

import Users from "./collections/Users.js";
import Categories from "./collections/Categories.js";
import Colors from "./collections/Colors.js";
import Materials from "./collections/Materials.js";
import Media from "./collections/Media.js";
import Models from "./collections/Models.js";
import Patterns from "./collections/Patterns.js";
import Products from "./collections/Products.js";

const mockModulePath = path.resolve(__dirname, "mocks/emptyObject.js");

const storageAdapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  },
  bucket: process.env.S3_BUCKET_NAME,
});

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- Mattarazi Uomo",
      favicon: "/assets/favicon.svg",
    },
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            fs: mockModulePath,
            // util: mockModulePath,
            // os: mockModulePath,
          },
        },
      };
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
    },
  },
  cors: [process.env.NEXT_PUBLIC_EXTERNAL_URL || ""].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_EXTERNAL_URL || "",
  ].filter(Boolean),
  editor: slateEditor({}),
  collections: [
    Products,
    Categories,
    Colors,
    Materials,
    Media,
    Models,
    Patterns,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: storageAdapter,
        },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
