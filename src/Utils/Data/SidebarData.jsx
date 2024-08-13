// component
import Iconify from "../Layouts/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const SidebarNavigation = [
  {
    title: "Home",
    path: "/home",
    icon: getIcon("ant-design:home-filled"),
  },
  {
    title: "Dashboard",
    path: "/admin-dashboard",
    icon: getIcon("ic:round-dashboard"),
  },
  // {
  //     title: 'Login',
  //     path: '/login',
  //     icon: getIcon('eva:people-fill'),
  // },
  {
    title: "Book",
    path: "/book",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "About Us",
    path: "/about-us",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Support",
    path: "/support",
    icon: getIcon("ic:sharp-contact-support"),
  },
  {
    title: "Logout",
    path: "",
    icon: getIcon("tabler:logout"),
  },
];

export default SidebarNavigation;
