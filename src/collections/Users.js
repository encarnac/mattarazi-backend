import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";
import { isDev } from "../access/isDev";
import { isUser } from "../access/isUser";

const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Access Controls",
  },
  access: {
    read: () => {
      return Boolean(isUser || isAdminOrDev);
    },
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
