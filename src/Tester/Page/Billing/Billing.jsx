import styles from "./Billing.module.css";
import classname from "classnames/bind";
import { get_all_user_payout_bug } from "../../../Services/UserPayout";
import { useEffect, useState } from "react";
import { useUser } from "../../../Context/AuthContext";
import Modal from "../../Component/Modal/Modal";
import { get_user_payout_infor, update_user_payout_infor } from "../../../Services/UserService";
import useToast from "../../../CustomHook/useToast";
import PayoutChart from "../../Component/PayoutChart/PayoutChart";
const cx = classname.bind(styles);
function Billing() {
	const { getUserValue } = useUser();
	const [isOpenPopupBilling, setIsOpenPopupBilling] = useState(false);
	const [billingData, setBillingData] = useState([]);
	const [payoutInfor, setPayoutInfor] = useState();
	const { showToast } = useToast();
	const [form, setForm] = useState();
	useEffect(() => {
		const fetchPayout = async () => {
			const res = await get_all_user_payout_bug(getUserValue().id);
			if (res.status == "success") {
				console.log(res.data);
				setBillingData(res.data);
			} else {
				console.log(res);
			}
		};
		fetchPayout();
	}, []);
	useEffect(() => {
		const fetchUserPayoutData = async () => {
			const res = await get_user_payout_infor(getUserValue().id);
			if (res.status == "success") {
				setPayoutInfor(res.data);
				setForm(res.data);
			}
		};
		fetchUserPayoutData();
	}, []);
	const handleSubmit = async e => {
		e.preventDefault();
		const data = {
			...form,
			id: getUserValue().id,
		};
		console.log(data);
		const res = await update_user_payout_infor(data);
		if (res.status == "success") {
			setPayoutInfor(res.data);
			showToast({
				message: "Update payout information successfully",
				type: "success",
			});
			setIsOpenPopupBilling(false);
		} else {
			showToast({
				message: "Something went wrong",
				type: "error",
			});
		}
	};
	return (
		<div className={cx("billing-container")}>
			<h2 className={cx("title")}>Billing</h2>

			<div className={cx("credit-box")}>
				<div className={cx("credit-icon")}>
					<img src="/icons/i-pay.svg"></img>
				</div>
				<div className={cx("credit-info")}>
					<span className={cx("credit-amount")}>{payoutInfor?.payout_method}</span>
					<span className={cx("credit-label")}>{payoutInfor?.payout_account_info}</span>
				</div>
				<button onClick={() => setIsOpenPopupBilling(true)} className={cx("manage-btn")}>
					Manage Billing
				</button>
			</div>
			{billingData && <PayoutChart data={billingData}></PayoutChart>}

			<h3 className={cx("subtitle")}>All Payments</h3>
			<div className={cx("table")}>
				<div className={cx("table-header")}>
					<span>Date</span>
					<span>Amount</span>
					<span>Status</span>
				</div>

				{billingData.map(item => (
					<div className={cx("table-row")}>
						<span>{item.date}</span>
						<span>$ {item.totalAmount}</span>
						<span className={cx("status-completed")}>Completed</span>
					</div>
				))}
			</div>
			{isOpenPopupBilling && (
				<div onClick={() => setIsOpenPopupBilling(false)}>
					<Modal>
						<form onSubmit={handleSubmit} className={cx("payout-form")}>
							<h3>Change your payout information</h3>
							<div className={cx("payout-form__group")}>
								<label className={cx("payout-form__label")}>Payout Method:</label>
								<select
									name="payout_method"
									value={form?.payout_method}
									onChange={e => {
										setForm(prev => ({ ...prev, payout_method: e.target.value }));
									}}
									className={cx("payout-form__select")}
								>
									<option value="PayPal">PayPal</option>
									<option value="Bank Transfer">Bank Transfer</option>
								</select>
							</div>

							<div className={cx("payout-form__group")}>
								<label className={cx("payout-form__label")}>Account Info:</label>
								<input
									type="text"
									name="payout_account_info"
									value={form?.payout_account_info}
									onChange={e => {
										setForm(prev => ({ ...prev, payout_account_info: e.target.value }));
									}}
									className={cx("payout-form__input")}
								/>
							</div>

							<div className={cx("payout-btn-group")}>
								<button
									onClick={e => {
										e.preventDefault();
										setIsOpenPopupBilling(false);
									}}
									type="submit"
									className={cx("payout-form__submit-button", "cancle")}
								>
									Cancle
								</button>
								<button
									onClick={e => {
										handleSubmit(e);
									}}
									className={cx("payout-form__submit-button")}
								>
									Submit
								</button>
							</div>
						</form>
					</Modal>
				</div>
			)}
		</div>
	);
}

export default Billing;
