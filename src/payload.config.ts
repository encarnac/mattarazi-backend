// @ts-nocheck
import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Logo from "./graphics/Logo.jsx";
import Icon from "./graphics/Icon.jsx";
import BeforeDashboard from "./components/BeforeDashboard.jsx";
import BeforeLogin from "./components/BeforeLogin.jsx";

import Users from "./collections/Users.js";
import Categories from "./collections/Categories.js";
import Colors from "./collections/Colors.js";
import Materials from "./collections/Materials.js";
import Models from "./collections/Models.js";
import Patterns from "./collections/Patterns.js";
import Products from "./collections/Products.js";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Mattarazi Uomo",
      favicon: "/assets/favicon.svg",
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
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
