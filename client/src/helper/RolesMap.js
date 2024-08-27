import { Roles } from "../config/userRoles";

const RolesMap = new Map();
RolesMap.set(Roles.TRAINEE, "مُتدرب");
RolesMap.set(Roles.INSTRUCTOR, "مُدرب");
RolesMap.set(Roles.ADMIN, "مُشرف عام");
export { RolesMap };
