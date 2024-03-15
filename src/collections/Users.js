import { CollectionConfig } from "payload/types";

const Users = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Admin Permissions",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
