import { IconCubeSpark } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <div className="navbar rounded-xl shadow-xl bg-base-100 fixed z-10">
      <a className="btn btn-ghost text-xl">
        DapurApp
        <IconCubeSpark stroke={2} />
      </a>
    </div>
  );
}
