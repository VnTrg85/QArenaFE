// ChatSocket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

const NotificationSocket = ({ userId, onNotify }) => {
	const clientRef = useRef(null);

	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/ws"); // endpoint backend
		const client = new Client({
			webSocketFactory: () => socket,
			reconnectDelay: 5000,
			onConnect: () => {
				console.log("Connected!");

				// Subscribe nhận thông báo riêng
				client.subscribe(`/user/${userId}/notify`, message => {
					onNotify(message.body); // thông báo
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
	}, [userId]);
};

export default NotificationSocket;
