import { useCallback, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from ".";

import { useLogoutMutation, useMeQuery } from "generated/graphql";

import isServer from "@utils/isServer";

import styles from "@styles/components/Navbar.module.css";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, refetch } = useMeQuery({
    skip: isServer(),
  });

  const handleLogout = useCallback(async () => {
    await logout();
    router.reload();
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <nav aria-label="main navbar" className={styles.navbar}>
      {data?.me ? (
        <>
          <h3>
            {data.me.name} {data.me.surname}
          </h3>
          <Button
            className="p-m ml-100 not-expand"
            text="logout"
            onClick={handleLogout}
            loading={logoutLoading}
          />
        </>
      ) : (
        <>
          <div />
          <Link href="/login">
            <a title="Fake login">
              <Button className="p-m" text="login" />
            </a>
          </Link>
        </>
      )}
    </nav>
  );
}
