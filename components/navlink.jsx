import Link from "next/link";

export default function NavLink({ href, name }) {
  return (
    <Link href={href} passHref>
      <a>{name}</a>
    </Link>
  );
}
