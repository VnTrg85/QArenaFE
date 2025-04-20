// ChatSocket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

const ChatSocket = ({ bugId, userId, onMessage, onNotify }) => {
	const clientRef = useRef(null);

	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/ws"); // endpoint backend
		const client = new Client({
			webSocketFactory: () => socket,
			reconnectDelay: 5000,
			onConnect: () => {
				console.log("Connected!");

				// Subscribe nhận tin nhắn trong bug này
				client.subscribe(`/topic/bug-report/${bugId}`, message => {
					const msg = JSON.parse(message.body);
					onMessage(msg); // callback nhận tin
				});

				// Subscribe nhận thông báo riêng
				client.subscribe(`/user/${userId}/notify`, message => {
					onNotify(message.body); // thông báo
				});
			},
		});

		client.activate();
		clientRef.current = client;

		return () => {
			console.log("Un   Connected!");
			if (clientRef.current) {
				clientRef.current.deactivate();
			}
		};
	}, [bugId, userId]);

	const sendMessageBug = message => {
		clientRef.current?.publish({
			destination: "/app/bug/chat.send",
			body: JSON.stringify(message),
		});
	};

	const sendMessageProject = message => {
		clientRef.current?.publish({
			destination: "/app/project/chat.send",
			body: JSON.stringify(message),
		});
	};
	return { sendMessageBug };
};

export default ChatSocket;
