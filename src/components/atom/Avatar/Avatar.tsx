import React from "react";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import dogImageURL from "../../../assets/Dog.png";
import { useTheme } from "../../../contexts/ThemeContext";
type AvatarProps = {
	type: "ai" | "user";
};
const Avatar = ({ type }: AvatarProps) => {
	const { themeColor } = useTheme();
	return (
		<div className={clsx("avatar", { user: type === "user" })}>
			{type === "user" ? (
				<img
					className='avatarImage'
					src={"./build/" + dogImageURL.split("./")[1]}
				/>
			) : (
				<Icon color={themeColor} width={60} height={60} type='ai' />
			)}
		</div>
	);
};

export default Avatar;
