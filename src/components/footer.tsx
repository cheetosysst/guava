import { StopCircle } from "./icon";

export default function Footer() {
	return (
		<footer class="footer max-w-7xl mx-auto w-full p-10 drop-shadow-lg bg-neutral text-neutral-content rounded-t-3xl">
			<aside>
				<StopCircle
					name="Main Logo in Footer"
					className="w-24 h-24 rotate-[30deg]"
					width={2.5}
				/>
				<p>
					ACME Industries Ltd.
					<br />
					Providing reliable tech since 1992
				</p>
			</aside>
			<nav>
				<header class="footer-title">Services</header>
				<a href="/" class="link link-hover">
					Branding
				</a>
				<a href="/" class="link link-hover">
					Design
				</a>
				<a href="/partner" class="link link-hover">
					Partner
				</a>
				<a href="/admin" class="link link-hover">
					Admin
				</a>
			</nav>
			<nav>
				<header class="footer-title">Company</header>
				<a href="/" class="link link-hover">
					About us
				</a>
				<a href="/" class="link link-hover">
					Contact
				</a>
				<a href="/" class="link link-hover">
					Jobs
				</a>
				<a href="/" class="link link-hover">
					Press kit
				</a>
			</nav>
			<nav>
				<header class="footer-title">Legal</header>
				<a href="/" class="link link-hover">
					Terms of use
				</a>
				<a href="/" class="link link-hover">
					Privacy policy
				</a>
				<a href="/" class="link link-hover">
					Cookie policy
				</a>
			</nav>
		</footer>
	);
}
