import Home from "../screens/home";
import Marketplace from "../screens/marketplace";
import Notification from "../screens/notification";
import Profile from "../screens/profile";
import Video from "../screens/video";

export const navbarData = [
  {
    id: 1,
    route: Home,
    name: "Home",
    activeIconName: "home",
    activeiconType: "Entypo",
    inactiveIconName: "home-outline",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 28,
  },
  {
    id: 2,
    route: Video,
    name: "Watch",
    activeIconName: "youtube-tv",
    activeiconType: "MaterialCommunityIcons",
    inactiveIconName: "television-play",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 3,
    route: Marketplace,
    name: "MarketPlace",
    activeIconName: "shop",
    activeiconType: "Entypo",
    inactiveIconName: "storefront-outline",
    inactiveIconType: "MaterialCommunityIcons",
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 4,
    route: Notification,
    name: "Notification",
    activeIconName: "notifications",
    activeiconType: "Ionicons",
    inactiveIconName: "notifications-outline",
    inactiveIconType: "Ionicons",
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 5,
    route: Profile,
    name: "Profile",
    activeIconName: "person",
    activeiconType: "Ionicons",
    inactiveIconName: "person-outline",
    inactiveIconType: "Ionicons",
    size: 24,
    unFocusSize: 24,
  },
];
