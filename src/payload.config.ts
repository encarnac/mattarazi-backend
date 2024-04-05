// @ts-nocheck
import path from "path";

import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import search, { searchOverrides } from "@payloadcms/plugin-search";

import Users from "./collections/Users";
import Categories from "./collections/Categories";
import Colors from "./collections/Colors";
import Compositions from "./collections/Compositions";
import Photos from "./collections/Photos";
import Models from "./collections/Models";
import Patterns from "./collections/Patterns";
import Products from "./collections/Products";
import { Search, beforeSyncSearch } from "./collections/Search";

import Logo from "./graphics/Logo";
import Icon from "./graphics/Icon";
import BeforeDashboard from "./components/BeforeDashboard";
import BeforeLogin from "./components/BeforeLogin";
import CustomNavBar from "./components/navBar/CustomNavBar";
import CustomDashboardView from "./views/CustomDashboardView";
import getAllProducts from "./endpoints/getAllProducts";
import { before } from "lodash";

const mockModulePath = path.resolve(__dirname, "mocks/emptyObject.js");
const styleSheet = path.resolve(__dirname, "./stylesheet.css");

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
    css: styleSheet,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          extensions: ["", ".js", ".jsx", ".tsx"],
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
      Nav: CustomNavBar,
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
      views: { Dashboard: CustomDashboardView },
    },
  },
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_EXTERNAL_URL,
  ],
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_EXTERNAL_URL,
  ],
  editor: slateEditor({}),
  collections: [
    Products,
    Categories,
    Colors,
    Compositions,
    Photos,
    Models,
    Patterns,
    Users,
  ],
  indexSortableFields: true,
  endpoints: [
    {
      path: "/search?:query",
      root: true,
      method: "get",
      handler: getAllProducts(),
    },
  ],
  plugins: [
    cloudStorage({
      enabled: true,
      collections: {
        photos: {
          disablePayloadAccessControl: false,
          adapter: storageAdapter,
        },
      },
    }),
    search({
      collections: ["products"],
      searchOverrides: Search,
      beforeSync: beforeSyncSearch,
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  debug: process.env.NODE_ENV === "development",
});
