import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Login.module.css";
import classname from "classnames/bind";
import { login, signup } from "../../Services/AuthService";
import { useUser } from "../../Context/AuthContext";
import { Router, useNavigate } from "react-router-dom";
import { verify_token } from "../../Services/AuthService";

const cx = classname.bind(styles);

const Login = () => {
	const navigate = useNavigate();
	//State
	const { setUserValue, getUserValue } = useUser();
	const [data, setData] = useState({
		email: "",
		password: "",
		repeat_password: "",
		role: "",
	});
	const isFirstRender = useRef({
		email: true,
		password: true,
		repeat_password: true,
	});

	const [isLogin, setIsLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorPass, setErrorPass] = useState(false);
	const [errorName, setErrorName] = useState(false);
	const [errorRepeatPass, setErrorRepeatPass] = useState(false);
	const [checkValid, setCheckValid] = useState({
		name: false,
		email: false,
		password: false,
		repeat_password: false,
		term_checked: false,
		role: false,
	});

	const validateTokenAPI = async (token, email) => {
		try {
			const response = await verify_token(token, email);
			if (response.status == "success") return true;
			else return false;
		} catch (error) {
			console.error("Token validation failed:", error);
			return false;
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("access_token");
			const user = localStorage.getItem("user");
			const role = localStorage.getItem("role");
			if (!token) {
				return;
			}

			const isValid = await validateTokenAPI(token, user);
			if (!isValid) {
				localStorage.removeItem("access_token");
				return;
			} else {
				if (role == "tester") {
					navigate("/dGVzdGVy");
				} else if (role == "customer") {
					navigate("/Q3VzdG9tZXI=");
				}
			}
		};

		checkAuth();
	}, []);
	//Method
	useEffect(() => {
		setData({
			name: "",
			email: "",
			password: "",
			repeat_password: "",
			role: "",
		});
		setErrorEmail(false);
		setErrorPass(false);
		setErrorRepeatPass(false);
		setErrorName(false);
		isFirstRender.current = {
			name: true,
			email: true,
			password: true,
			repeat_password: true,
		};
	}, [isLogin]);
	const isValidEmail = email => {
		const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return pattern.test(email);
	};

	const handleChangeName = e => {
		setData(prev => ({
			...prev,
			name: e.target.value,
		}));
	};

	useEffect(() => {
		if (isFirstRender.current.name) {
			isFirstRender.current.name = false;
			return;
		}
		if (data.name.length > 0) {
			setCheckValid(prev => ({
				...prev,
				name: true,
			}));
			setErrorName("");
		} else {
			setCheckValid(prev => ({
				...prev,
				name: false,
			}));
			setErrorName("Name must be not empty");
		}
	}, [data.name]);

	const handleChangeEmail = e => {
		setData(prev => ({
			...prev,
			email: e.target.value,
		}));
	};

	useEffect(() => {
		if (isFirstRender.current.email) {
			isFirstRender.current.email = false;
			return;
		}
		if (isValidEmail(data.email)) {
			setCheckValid(prev => ({
				...prev,
				email: true,
			}));
			setErrorEmail("");
		} else {
			setCheckValid(prev => ({
				...prev,
				email: false,
			}));
			setErrorEmail("Email is not correct format");
		}
	}, [data.email]);
	const handleChangeRepeatPass = e => {
		setData(prev => ({
			...prev,
			repeat_password: e.target.value,
		}));
	};
	useEffect(() => {
		if (isFirstRender.current.password) {
			isFirstRender.current.password = false;
			return;
		}
		if (data.password != data.repeat_password) {
			setCheckValid(prev => ({
				...prev,
				repeat_password: false,
			}));
			setErrorRepeatPass("Repeat password is not same with password");
		} else {
			setCheckValid(prev => ({
				...prev,
				repeat_password: true,
			}));
			setErrorRepeatPass("");
		}
	}, [data.repeat_password]);

	const handleChangePass = e => {
		setData(prev => ({
			...prev,
			password: e.target.value,
		}));
	};
	useEffect(() => {
		if (isFirstRender.current.repeat_password) {
			isFirstRender.current.repeat_password = false;
			return;
		}
		if (data.password.length > 5) {
			setCheckValid(prev => ({
				...prev,
				password: true,
			}));
			setErrorPass("");
		} else {
			setCheckValid(prev => ({
				...prev,
				password: false,
			}));
			setErrorPass("Password length must be greater than 5");
		}
	}, [data.password]);

	const isValidSignup = useMemo(() => {
		return checkValid.email && checkValid.password && checkValid.repeat_password && checkValid.term_checked && checkValid.role;
	});

	const isValidSignin = useMemo(() => {
		return checkValid.email && checkValid.password;
	});

	const handleSignup = async () => {
		const res = await signup(data);
		if (res.status == "success") {
			setIsLogin(true);
		} else {
		}
	};

	const handleSignin = async () => {
		const res = await login({ email: data.email, password: data.password });
		if (res.status == "success") {
			console.log(res.data.token);
			localStorage.setItem("access_token", res.data.token);
			localStorage.setItem("user", res.data.email);
			localStorage.setItem("role", res.data.role);
			setUserValue({ email: res.data.email });
			console.log(getUserValue());
			navigate("/dGVzdGVy");
		} else {
			// console.log(res.data);
		}
	};

	return (
		<div class={cx("login-wrapper")}>
			{!isLogin ? (
				<div class={cx("container", "signup")}>
					<div class={cx("text-section")}>
						<img src="https://i.pinimg.com/736x/46/95/ab/4695ab2e031f45be1a1a2f2dbe722826.jpg"></img>
					</div>
					<div class={cx("form-section")}>
						<h2>Sign Up</h2>
						<small class={cx("small-text")}>Test with precision, deliver with confidence</small>
						<p class={cx("divide-second")}>
							Role <span className={cx("required")}>*</span>
						</p>
						<div class={cx("roles-buttons")}>
							<div
								onClick={() => {
									setData(prev => ({
										...prev,
										role: "2",
									}));
									setCheckValid(prev => ({
										...prev,
										role: true,
									}));
								}}
								class={cx(data.role == "2" ? "active-role" : "")}
							>
								<img src="/icons/i-customer.svg" />
								<p>Customer</p>
							</div>
							<div
								onClick={() => {
									setData(prev => ({
										...prev,
										role: "3",
									}));
									setCheckValid(prev => ({
										...prev,
										role: true,
									}));
								}}
								class={cx(data.role == "3" ? "active-role" : "")}
							>
								<img src="/icons/i-user.svg" />
								<p>Tester</p>
							</div>
						</div>
						<div class={cx("form-ctn")}>
							<span>
								Name <span className={cx("required")}>*</span>
							</span>
							<div class={cx("input-ctn")}>
								<input onChange={e => handleChangeName(e)} type="text" required />
							</div>
							{errorName && <p className={cx("error")}>{errorName}</p>}

							<span>
								Email <span className={cx("required")}>*</span>
							</span>
							<div class={cx("input-ctn")}>
								<input onChange={e => handleChangeEmail(e)} type="email" required />
							</div>
							{errorEmail && <p className={cx("error")}>{errorEmail}</p>}
							<span>
								Password <span className={cx("required")}>*</span>
							</span>
							<div class={cx("input-ctn")}>
								<input value={data.password} onChange={e => handleChangePass(e)} type={showPassword ? "text" : "password"} required />
								{showPassword ? (
									<img src="/icons/i-eye-close.svg" onClick={() => setShowPassword(false)}></img>
								) : (
									<img src="/icons/i-eye-open.svg" onClick={() => setShowPassword(true)}></img>
								)}
							</div>
							{errorPass && <p className={cx("error")}>{errorPass}</p>}

							<span>
								Repeat Password <span className={cx("required")}>*</span>
							</span>
							<div class={cx("input-ctn")}>
								<input onChange={e => handleChangeRepeatPass(e)} type="password" value={data.repeat_password} required />
							</div>
							{errorRepeatPass && <p className={cx("error")}>{errorRepeatPass}</p>}

							<div class={cx("checkbox")}>
								{" "}
								<input
									onChange={e => {
										setCheckValid(prev => ({
											...prev,
											term_checked: e.target.checked,
										}));
									}}
									type="checkbox"
									required
								/>
								<label>
									I accept the <a href="#">Term</a>
								</label>{" "}
								<span className={cx("required")}>*</span>
							</div>
							{/* <p class={cx("divide")}>Or with</p>
							<div class={cx("social-buttons")}>
								<div>
									<img src="/icons/i-google.svg" />
									<p>Sign Up with Google</p>
								</div>
								<div>
									<img src="/icons/i-facebook.svg" />
									<p>Sign Up with Facebook</p>
								</div>
							</div> */}
							<button onClick={handleSignup} type="submit" class={cx("signup-button", isValidSignup ? "" : "disable")}>
								Sign Up
							</button>
						</div>
						<p class={cx("text-bottom")}>
							Already have an account?{" "}
							<span
								class={cx("link")}
								onClick={() => {
									setIsLogin(true);
								}}
							>
								Sign In
							</span>
						</p>
					</div>
				</div>
			) : (
				<div class={cx("container", "login")}>
					<div class={cx("form-section")}>
						<h2>Sign In</h2>
						<small class={cx("small-text")}>to your account</small>
						<div class={cx("form-ctn")}>
							<span>
								Email <span className={cx("required")}>*</span>
							</span>

							<div class={cx("input-ctn")}>
								<input onChange={e => handleChangeEmail(e)} type="email" required />
							</div>
							{errorEmail && <p className={cx("error")}>{errorEmail}</p>}
							<span>
								Password <span className={cx("required")}>*</span>
							</span>

							<div class={cx("input-ctn")}>
								<input onChange={e => handleChangePass(e)} type={showPassword ? "text" : "password"} required />
								{showPassword ? (
									<img src="/icons/i-eye-close.svg" onClick={() => setShowPassword(false)}></img>
								) : (
									<img src="/icons/i-eye-open.svg" onClick={() => setShowPassword(true)}></img>
								)}
							</div>
							{errorPass && <p className={cx("error")}>{errorPass}</p>}

							<span class={cx("forgot-title")}>Forgot password?</span>
							<button onClick={handleSignin} type="submit" class={cx("signup-button", !isValidSignin ? "disable" : "")}>
								Sign in
							</button>
						</div>
						<p class={cx("text-bottom")}>
							Not a member yet?{" "}
							<span
								class={cx("link")}
								onClick={() => {
									setIsLogin(false);
								}}
							>
								Sign Up
							</span>
						</p>
					</div>
					<div class={cx("text-section")}>
						<img src="https://i.pinimg.com/736x/8e/7c/92/8e7c9299ff4538d4455f3c27830df8d1.jpg"></img>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
