import { isDev } from "../access/isDev";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Access Controls",
    hideAPIURL: true,
  },
  access: {
    read: isAdminOrDev,
    create: isDev,
    update: isAdminOrDev,
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
