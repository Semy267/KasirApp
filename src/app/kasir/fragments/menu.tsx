import { IconCookie, IconCup, IconMeat } from "@tabler/icons-react";

export default function Menu({
  type,
  setType,
}: {
  type: string;
  setType: (type: string) => void;
}) {
  return (
    <ul className="menu w-full gap-2">
      <li>
        <a
          className={`h-14 flex items-center gap-2 font-semibold ${
            type === "makanan" ? "active" : ""
          }`}
          onClick={() => setType("makanan")}
        >
          <IconMeat stroke={2} />
          Makanan
        </a>
      </li>
      <li>
        <a
          className={`${
            type === "minuman" ? "active" : ""
          } h-14 flex items-center gap-2 font-semibold`}
          onClick={() => setType("minuman")}
        >
          <IconCup stroke={2} />
          Minuman
        </a>
      </li>
      <li>
        <a
          className={`h-14 flex items-center gap-2 font-semibold ${
            type === "cemilan" ? "active" : ""
          } `}
          onClick={() => setType("cemilan")}
        >
          <IconCookie stroke={2} />
          Cemilan
        </a>
      </li>
    </ul>
  );
}
