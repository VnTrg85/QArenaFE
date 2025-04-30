// ChatSocket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";
const ProjectChatSocket = ({ projectId, onMessage }) => {
	const clientRef = useRef(null);

	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/ws"); // endpoint backend
		const client = new Client({
			webSocketFactory: () => socket,
			reconnectDelay: 5000,
			onConnect: () => {
				// Subscribe nhận thông báo riêng
				client.subscribe(`/topic/project/${projectId}`, message => {
					const msg = JSON.parse(message.body);
					onMessage(msg); // callback nhận tin
				});
			},
		});

		client.activate();
		clientRef.current = client;

		return () => {
			if (clientRef.current) {
				clientRef.current.deactivate();
			}
		};
	}, [projectId]);

	const sendMessageProject = message => {
		console.log(1111);
		clientRef.current?.publish({
			destination: "/app/project/chat.send",
			body: JSON.stringify(message),
		});
	};
	return { sendMessageProject };
};

export default ProjectChatSocket;
