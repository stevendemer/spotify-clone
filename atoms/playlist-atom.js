import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const playlistIdState = atom({
  // must be unique
  key: "playlistIdState",
  default: "6UvJUrRFyCmd8AI4KoYo6Q",
});
