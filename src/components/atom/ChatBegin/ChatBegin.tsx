import React from "react";
type ChatBeginProps = {
	text: string;
};
const ChatBegin = ({ text }: ChatBeginProps) => {
	return (
		<div className='chatBegins'>
			<div className='line'></div>
			<p className='grayedout'>{text}</p>
			<div className='line'></div>
		</div>
	);
};

export default ChatBegin;
