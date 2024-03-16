import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Logo from "./graphics/Logo.jsx";
import Icon from "./graphics/Icon.jsx";
import BeforeDashboard from "./components/BeforeDashboard";
import BeforeLogin from "./components/BeforeLogin";

import Users from "./collections/Users";
import Categories from "./collections/Categories";
import Colors from "./collections/Colors";
import Materials from "./collections/Materials";
import Models from "./collections/Models";
import Patterns from "./collections/Patterns";
import Products from "./collections/Products";

export default buildConfig({
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
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      beforeLogin: [BeforeLogin],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      beforeDashboard: [BeforeDashboard],
    },
  },
  cors: [process.env.NEXT_PUBLIC_EXTERNAL_URL || ""].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL,
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
