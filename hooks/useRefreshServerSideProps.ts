import { useRouter } from "next/router";

export default function useRefreshServerSideProps() {
  const router = useRouter();
  return () => router.replace(router.asPath);
}
