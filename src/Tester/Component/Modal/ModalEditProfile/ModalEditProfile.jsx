import Modal from "../Modal";
import styles from "./ModalEditProfile.module.css";
import classname from "classnames/bind";
import { useUser } from "../../../../Context/AuthContext";
import { update_user } from "../../../../Services/UserService";
import { useState } from "react";
import useToast from "../../../../CustomHook/useToast";
const cx = classname.bind(styles);

function ModalEditProfile({ closeModal, updateUser }) {
	const { getUserValue, setUserValue } = useUser();
	const [user, setUser] = useState(getUserValue());
	const { showToast } = useToast();
	const handleSaveInfor = async () => {
		const data = {
			...user,
			date_of_birth: user.dateOfBirth,
		};
		const res = await update_user(data);
		if (res.status == "success") {
			showToast({
				message: "Update successfully",
				type: "success",
			});
			setUserValue(res.data);
			updateUser(res.data);
			closeModal();
		} else {
			showToast({
				message: "Some thing went wrong",
				type: "error",
			});
		}
	};
	return (
		<Modal closeModal={closeModal}>
			<div class={cx("profile-edit-popup")}>
				<h2>Edit Employee Profile</h2>

				<div class={cx("profile-edit-form-group")}>
					<label for="fullName">Full Name</label>
					<input
						onInput={e => {
							setUser(prev => ({ ...prev, name: e.target.value }));
						}}
						type="text"
						id="fullName"
						value={user.name}
					/>
				</div>

				<div class={cx("profile-edit-form-group")}>
					<label for="phone">Phone</label>
					<input
						type="text"
						id="phone"
						value={user.phone}
						placeholder="Fill your phone"
						onInput={e => {
							setUser(prev => ({ ...prev, phone: e.target.value }));
						}}
					/>
				</div>

				<div class={cx("profile-edit-form-group")}>
					<label for="address">Address</label>
					<input
						type="text"
						id="address"
						value={user.address}
						onInput={e => {
							setUser(prev => ({ ...prev, address: e.target.value }));
						}}
					/>
				</div>

				<div class={cx("profile-edit-form-group")}>
					<label for="city">City, State</label>
					<input
						type="text"
						id="city"
						value={user.city}
						onInput={e => {
							setUser(prev => ({ ...prev, city: e.target.value }));
						}}
					/>
				</div>

				<div class={cx("profile-edit-form-group")}>
					<label for="dob">Date of Birth</label>
					<input
						type="date"
						id="dob"
						value={user.dateOfBirth}
						onInput={e => {
							setUser(prev => ({ ...prev, dateOfBirth: e.target.value }));
						}}
					/>
				</div>

				<div class={cx("profile-edit-actions")}>
					<button class={cx("profile-edit-button", "cancel")} onClick={closeModal}>
						Cancel
					</button>
					<button onClick={handleSaveInfor} class={cx("profile-edit-button", "save")}>
						Save
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default ModalEditProfile;
