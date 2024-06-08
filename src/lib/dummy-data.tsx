export interface NavOption {
  id: number;
  name: string;
  value: string;
  href: string;
  icon?: JSX.Element;
}

export interface IMedia {
  id: number | string;
  title: string;
  data?: string;
  url?: string;
  type: string;
  createdAt: Date;
  cover?: string;
 }



export const sidebarDiscoverOptions: NavOption[] = [
  {
    id: 1,
    name: "Home",
    value:"home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
];

export const sidebarLibraryOptions: NavOption[] = [
  {
    id: 1,
    name: "Images",
    href: "/image",
    value:"image",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Documents",
    href: "/document",
    value:"document",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Audio",
    href: "/audio",
    value:"audio",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Video",
    href: "/video",
    value:"video",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
      </svg>
    ),
  },
];



export const dummyData = [
  {
    id: 1,
    title: "Image 1",
    url: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    cover: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    type: "image",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 2,
    title: "Image 2",
    url: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    cover: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    type: "image",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 3,
    title: "Image 3",
    url: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    cover: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    type: "image",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 4,
    title: "Document 1",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    cover: "https://images.unsplash.com/photo-1619418602850-35ad20aa1700?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "document",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 5,
    title: "Document 2",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    cover: "https://images.unsplash.com/photo-1619418602850-35ad20aa1700?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "document",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  // {
  //   id: 6,
  //   title: "Document 3",
  //   url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  //   cover: "https://images.unsplash.com/photo-1619418602850-35ad20aa1700?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   type: "document",
  //   createdAt: new Date("2021-09-01T12:00:00Z"),
  // },
  {
    id: 7,
    title: "Audio 1",
    url: "https://projects.skratchdot.com/audio-files/loops/loop055.mp3",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "audio",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  // {
  //   id: 8,
  //   title: "Audio 2",
  //   url: "https://projects.skratchdot.com/audio-files/loops/loop046.mp3",
  //   cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   type: "audio",
  //   createdAt: new Date("2021-09-01T12:00:00Z"),
  // },
  // {
  //   id: 9,
  //   title: "Audio 3",
  //   url: "https://projects.skratchdot.com/audio-files/loops/loop046.mp3",
  //   cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   type: "audio",
  //   createdAt: new Date("2021-09-01T12:00:00Z"),
  // },
  {
    id: 10,
    title: "Big Buck Bunny",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cover: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "video",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 11,
    title: "first Blender Open",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    cover: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "video",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
  {
    id: 12,
    title: "HBO GO",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    cover: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "video",
    createdAt: new Date("2021-09-01T12:00:00Z"),
  },
];