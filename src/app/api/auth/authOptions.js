import GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			authorization: { params: { scope: "repo" } },
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account) {
				token.username = profile.login;
				token.accessToken = account.access_token;
			}
			return token;
		},

		// async session({ session, token }) {
		// 	// console.log("Token in session callback:", token); // Debug
		// 	session.accessToken = token.accessToken;
		// 	// console.log("Session in session callback:", session); // Debug
		// 	return session;
		// },
	},
};
