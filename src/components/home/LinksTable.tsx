import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import AvatarStack from "./AvatarStack";

// Type definitions
interface Column {
  name: string;
  uid: string;
}

interface LinkData {
  id: number;
  link: string;
  title: string;
  usedBy: { name: string; avatar: string }[];
}

type ColumnKey = "link" | "usedBy" | "actions";

interface IconProps {
  className?: string;
  [key: string]: any;
}

// Column configuration
export const columns: Column[] = [
  { name: "LINKS", uid: "link" },
  { name: "USED BY", uid: "usedBy" },
  { name: "ACTIONS", uid: "actions" },
];

// Link data
export const links: LinkData[] = [
  {
    id: 1,
    link: "https://www.google.com",
    title: "Google Search",
    usedBy: [
      {
        name: "User1",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      },
      {
        name: "User2",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      },
      {
        name: "User3",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      },
      {
        name: "User4",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      },
    ],
  },
  {
    id: 2,
    link: "https://www.facebook.com",
    title: "Facebook",
    usedBy: [
      {
        name: "User5",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
      },
      {
        name: "User6",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      },
    ],
  },
  {
    id: 3,
    link: "https://www.github.com",
    title: "GitHub",
    usedBy: [
      {
        name: "User7",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      },
      {
        name: "User8",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      },
      {
        name: "User9",
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      },
    ],
  },
  {
    id: 4,
    link: "https://www.youtube.com",
    title: "YouTube",
    usedBy: [
      {
        name: "User10",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026710d",
      },
      {
        name: "User11",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026711d",
      },
      {
        name: "User12",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026712d",
      },
      {
        name: "User13",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026713d",
      },
      {
        name: "User14",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026714d",
      },
    ],
  },
  {
    id: 5,
    link: "https://www.reddit.com",
    title: "Reddit",
    usedBy: [
      {
        name: "User15",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026715d",
      },
      {
        name: "User16",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026716d",
      },
    ],
  },
  {
    id: 6,
    link: "https://www.linkedin.com",
    title: "LinkedIn",
    usedBy: [
      {
        name: "User17",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026717d",
      },
      {
        name: "User18",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026718d",
      },
      {
        name: "User19",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026719d",
      },
    ],
  },
  {
    id: 7,
    link: "https://www.twitter.com",
    title: "Twitter",
    usedBy: [
      {
        name: "User20",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026720d",
      },
      {
        name: "User21",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026721d",
      },
      {
        name: "User22",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026722d",
      },
      {
        name: "User23",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026723d",
      },
    ],
  },
  {
    id: 8,
    link: "https://www.instagram.com",
    title: "Instagram",
    usedBy: [
      {
        name: "User24",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026724d",
      },
      {
        name: "User25",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026725d",
      },
    ],
  },
];

// Icon components
export const DeleteIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

// Main component
function LinksTable() {
  // Add inline styles for custom scrollbar
  React.useEffect(() => {
    // Create style element for custom scrollbar
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .thin-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      .thin-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .thin-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 20px;
      }
      
      .thin-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(155, 155, 155, 0.7);
      }
    `;
    document.head.appendChild(styleEl);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const renderCell = React.useCallback(
    (link: LinkData, columnKey: React.Key): React.ReactNode => {
      switch (columnKey as ColumnKey) {
        case "link":
          return (
            <div className="flex flex-col min-w-0">
              <span
                className="font-semibold text-xs md:text-sm truncate max-w-[120px] md:max-w-[180px]"
                title={link.title}
              >
                {link.title}
              </span>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-default-400 truncate max-w-[140px] md:max-w-[200px] hover:underline"
                title={link.link}
              >
                {link.link}
              </a>
            </div>
          );
        case "usedBy":
          return <AvatarStack users={link.usedBy} />;
        case "actions":
          return (
            <div className="relative flex gap-3">
              {/* Removed EyeIcon (view icon) */}
              <Tooltip content="Edit link">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete link">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );
  return (
    <div className="w-full min-w-[340px] md:min-w-0">
      <div className="relative">
        <Table          aria-label="Links table with custom cells"
          className="w-full text-xs md:text-sm"
          classNames={{
            wrapper: "max-h-[448px] overflow-y-auto overflow-x-hidden thin-scrollbar",
            thead: "sticky top-0 z-10 ",
            th: "bg-default-100 text-tiny font-semibold text-default-600 uppercase tracking-wide",
            tr: "hover:bg-default-50 transition-colors",
          }}
        >
          <TableHeader columns={columns}>
            {(column: Column) => (
              <TableColumn
                key={column.uid}
                className={
                  column.uid === "actions"
                    ? "w-20 md:w-24 text-center"
                    : column.uid === "usedBy"
                      ? "w-32 md:w-36"
                      : column.uid === "link"
                        ? "flex-1"
                        : ""
                }
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={links}>
            {(item: LinkData) => (
              <TableRow key={item.id}>
                {(columnKey: React.Key) => (                  <TableCell
                    className={
                      columnKey === "actions"
                        ? "w-20 md:w-24 text-center px-3 py-4"
                        : columnKey === "usedBy"
                        ? "w-32 md:w-36 px-3 py-4"
                        : columnKey === "link"
                        ? "flex-1 px-3 py-4"
                        : "px-3 py-4"
                    }
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LinksTable;
