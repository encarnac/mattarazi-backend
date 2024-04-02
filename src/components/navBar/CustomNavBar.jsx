import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import {
  EntityToGroup,
  Group,
} from "payload/dist/admin/utilities/groupNavItems";

import { getTranslation } from "payload/dist/utilities/getTranslation";

import {
  EntityType,
  groupNavItems,
} from "payload/dist/admin/utilities/groupNavItems";
import Chevron from "payload/dist/admin/components/icons/Chevron";
import { useAuth } from "payload/dist/admin/components/utilities/Auth";
import { useConfig } from "payload/components/utilities";
import { Hamburger } from "payload/dist/admin/components/elements/Hamburger";
import Logout from "payload/dist/admin/components/elements/Logout";
import NavGroup from "payload/dist/admin/components/elements/NavGroup";
import { useNav } from "payload/components/elements";
import "./styles.scss";

const baseClass = "nav";

const DefaultNav = () => {
  const { navOpen, navRef, setNavOpen } = useNav();
  const { permissions, user } = useAuth();
  const [groups, setGroups] = useState([]);
  const { i18n } = useTranslation("general");

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks },
    },
    collections,
    globals,
    routes: { admin },
  } = useConfig();

  useEffect(() => {
    const filteredCollections =
      user.role !== "developer"
        ? collections.filter((item) => item.slug !== "users")
        : collections;
    setGroups(
      groupNavItems(
        [
          ...filteredCollections
            .filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === "function" ? hidden({ user }) : hidden)
            )
            .filter((collection) => collection.slug !== "search") // Hiding Search Collection
            .map((collection) => {
              const entityToGroup = {
                entity: collection,
                type: EntityType.collection,
              };

              return entityToGroup;
            }),
          ...globals
            .filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === "function" ? hidden({ user }) : hidden)
            )
            .map((global) => {
              const entityToGroup = {
                entity: global,
                type: EntityType.global,
              };

              return entityToGroup;
            }),
        ],
        permissions,
        i18n
      )
    );
  }, [collections, globals, permissions, i18n, i18n.language, user]);

  return (
    <aside
      className={[baseClass, navOpen && `${baseClass}--nav-open`]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`${baseClass}__scroll`} ref={navRef}>
        <nav className={`${baseClass}__wrap`}>
          {Array.isArray(beforeNavLinks) &&
            beforeNavLinks.map((Component, i) => <Component key={i} />)}
          {groups.map(({ entities, label }, key) => {
            return (
              <NavGroup {...{ key, label }}>
                {entities.map(({ entity, type }, i) => {
                  let entityLabel;
                  let href;
                  let id;

                  if (type === EntityType.collection) {
                    href = `${admin}/collections/${entity.slug}`;
                    entityLabel = getTranslation(entity.labels.plural, i18n);
                    id = `nav-${entity.slug}`;
                  }

                  if (type === EntityType.global) {
                    href = `${admin}/globals/${entity.slug}`;
                    entityLabel = getTranslation(entity.label, i18n);
                    id = `nav-global-${entity.slug}`;
                  }

                  return (
                    <NavLink
                      activeClassName="active"
                      className={`${baseClass}__link`}
                      id={id}
                      key={i}
                      tabIndex={!navOpen ? -1 : undefined}
                      to={href}
                    >
                      <span className={`${baseClass}__link-icon`}>
                        <Chevron direction="right" />
                      </span>
                      <span className={`${baseClass}__link-label`}>
                        {entityLabel}
                      </span>
                    </NavLink>
                  );
                })}
              </NavGroup>
            );
          })}
          {Array.isArray(afterNavLinks) &&
            afterNavLinks.map((Component, i) => <Component key={i} />)}
          <div className={`${baseClass}__controls`}>
            <Logout tabIndex={!navOpen ? -1 : undefined} />
          </div>
        </nav>
      </div>
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <button
            className={`${baseClass}__mobile-close`}
            onClick={() => {
              setNavOpen(false);
            }}
            tabIndex={!navOpen ? -1 : undefined}
            type="button"
          >
            <Hamburger isActive />
          </button>
        </div>
      </div>
    </aside>
  );
};

const CustomNavBar = () => {
  return <DefaultNav />;
};

export default CustomNavBar;
