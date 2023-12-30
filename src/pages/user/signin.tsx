import Elysia from "elysia";
import MainLayout from "../../layouts/main";

const Page = new Elysia().get("/signin", () => (
	<MainLayout title="Signin">
		<div
			class="hero h-screen shadow-md bg-base-100"
			style="background-image: url(https://picsum.photos/id/1081/1000/800);"
		>
			<div class="hero-overlay bg-opacity-80" />
			<div class="hero-content text-white px-10 drop-shadow-md flex-col-reverse lg:flex-row-reverse">
				<div class="text-center lg:text-left">
					<h1 class="text-5xl font-bold text-warning">Singup now!</h1>
					<p class="py-6">
						Welcome back to ShopSmart Rewards! Sign in to your
						account and rediscover the joy of seamless shopping,
						personalized recommendations, and exclusive savings.
						Your shopping adventure continues here – let's dive in
						together!
					</p>
				</div>
				<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form
						class="card-body"
						id="loginform"
						hx-post="/api/user/signin"
						hx-trigger="submit"
						hx-target="#result"
					>
						<div id="result" />
						<div class="form-control">
							<label class="label">
								<span class="label-text">Username</span>
							</label>
							<input
								type="text"
								id="username"
								name="username"
								placeholder="Username"
								class="input input-bordered text-primary-content"
								required
							/>
						</div>
						<div class="form-control">
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								class="input input-bordered text-primary-content"
								required
							/>
							<label class="label">
								<a
									href="#temp"
									class="label-text-alt link link-hover"
								>
									Forgot password?
								</a>
							</label>
						</div>
						<div class="form-control mt-6">
							<input
								type="submit"
								class="btn btn-primary"
								value="Sing in"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	</MainLayout>
));
export default Page;
