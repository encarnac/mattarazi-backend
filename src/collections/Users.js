import { isDev } from "../access/isDev";

const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Access Controls",
    hideAPIURL: true,
  },
  access: {
    create: isDev,
    update: isDev,
    delete: isDev,
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Developer", value: "developer" },
      ],
      required: true,
      defaultValue: "user",
    },
  ],
};

export default Users;
