import { Image } from "react-native";

import defaultProfilePicture from "../assets/default-profile-picture.jpg";

export const defaultPath = Image.resolveAssetSource(defaultProfilePicture).uri;