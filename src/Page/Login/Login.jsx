import { useState } from "react";
import "./Login.css";
const Login = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div class="login-wrapper">
			{!isLogin ? (
				<div class="container signup">
					<div class="text-section">
						<img src="https://i.pinimg.com/736x/46/95/ab/4695ab2e031f45be1a1a2f2dbe722826.jpg"></img>
					</div>
					<div class="form-section">
						<h2>Sign Up</h2>
						<small class="small-text">Test with precision, deliver with confidence</small>
						<div class="form-ctn">
							<span>Email</span>
							<div class="input-ctn">
								<input type="email" required />
							</div>
							<span>Password</span>
							<div class="input-ctn">
								<input type={showPassword ? "text" : "password"} required />
								{showPassword ? (
									<img src="/icons/i-eye-close.svg" onClick={() => setShowPassword(false)}></img>
								) : (
									<img src="/icons/i-eye-open.svg" onClick={() => setShowPassword(true)}></img>
								)}
							</div>
							<small class="small-text">Use 8 or more characters with a mix of letters, numbers & symbols.</small>
							<span>Repeat Password</span>
							<div class="input-ctn">
								<input type="password" required />
							</div>
							<div class="checkbox">
								<input type="checkbox" required />
								<label>
									I accept the <a href="#">Term</a>
								</label>
							</div>
							<p class="divide">Or with</p>
							<div class="social-buttons">
								<div>
									<img src="/icons/i-google.svg" />
									<p>Sign Up with Google</p>
								</div>
								<div>
									<img src="/icons/i-facebook.svg" />
									<p>Sign Up with Facebook</p>
								</div>
							</div>
							<button type="submit" class="signup-button">
								Sign Up
							</button>
						</div>
						<p class="text-bottom">
							Already have an account?{" "}
							<span
								class="link"
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
				<div class="container login">
					<div class="form-section">
						<h2>Sign In</h2>
						<small class="small-text">to your account</small>
						<div class="form-ctn">
							<span>Email</span>
							<div class="input-ctn">
								<input type="email" required />
							</div>
							<span>Password</span>
							<div class="input-ctn">
								<input type={showPassword ? "text" : "password"} required />
								{showPassword ? (
									<img src="/icons/i-eye-close.svg" onClick={() => setShowPassword(false)}></img>
								) : (
									<img src="/icons/i-eye-open.svg" onClick={() => setShowPassword(true)}></img>
								)}
							</div>
							<span class="forgot-title">Forgot password?</span>
							<button type="submit" class="signup-button">
								Sign in
							</button>
						</div>
						<p class="text-bottom">
							Not a member yet?{" "}
							<span
								class="link"
								onClick={() => {
									setIsLogin(false);
								}}
							>
								Sign Up
							</span>
						</p>
					</div>
					<div class="text-section">
						<img src="https://i.pinimg.com/736x/8e/7c/92/8e7c9299ff4538d4455f3c27830df8d1.jpg"></img>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
