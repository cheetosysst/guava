import Elysia from "elysia";
import MainLayout from "../../layouts/main";

const Page = new Elysia().get("/signup", () => (
	<MainLayout title="Home">
		<div
			class="hero h-screen shadow-md bg-base-100"
			style="background-image: url(https://picsum.photos/id/1081/1000/800);"
		>
			<div class="hero-overlay bg-opacity-80" />
			<div class="hero-content text-white px-10 drop-shadow-md flex-col lg:flex-row-reverse">
				<div class="text-center lg:text-left">
					<h1 class="text-5xl font-bold text-warning">Singup now!</h1>
					<p class="py-6">
						Unleash the power of savings! Join ShopSmart Rewards now
						and experience a world where every purchase brings you
						closer to exclusive deals, cash back rewards, and
						personalized shopping joy. Sign up for free and elevate
						your shopping journey today!
					</p>
				</div>
				<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form class="card-body">
						<div class="form-control">
							<label class="label">
								<span class="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder="Username"
								class="input input-bordered"
								required
							/>
						</div>
						<div class="form-control">
							<label class="label">
								<span class="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="Email"
								class="input input-bordered"
								required
							/>
						</div>
						<div class="form-control">
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="Password"
								class="input input-bordered"
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
							<button type="button" class="btn btn-primary">
								Sing Up!
							</button>
							<div class="divider text-primary-content">OR</div>
							<button type="button" class="btn btn-neutral">
								Member login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</MainLayout>
));
export default Page;
