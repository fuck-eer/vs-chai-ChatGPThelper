import React from "react";
import ChatBegin from "../../atom/ChatBegin/ChatBegin";
import Messages from "../Messages/Messages";
import "../../../App.css";

const Body = () => {
	return (
		<div className='body'>
			<ChatBegin text='Chat begins here...' />
			<Messages />
		</div>
	);
};

export default Body;
