import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../helper/mongodb';
import connectDB from '../../../helper/connectDB';
import User from '../../../model/user';
import { compare } from 'bcrypt';

// Providers
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
		// TwitterProvider({
		// 	clientId: process.env.TWITTER_ID,
		// 	clientSecret: process.env.TWITTER_SECRET,
		// }),
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				// Connect to MongoDB
				await connectDB();

				// find user with the email

				const user = await User.findOne({
					email: credentials.email,
				});

				// Email not found

				if (!user) {
					throw new Error('Email is not registered');
				}

				// Check hashed password with DB hashed password

				const isPasswordCorrect = await compare(
					credentials?.password,
					user.password
				);

				if (!isPasswordCorrect) {
					throw new Error('Password is incorrect');
				}

				return user;
			},
		}),
		// ...add more providers here
	],
	pages: {
		signIn: '/auth',
	},
	adapter: MongoDBAdapter(clientPromise),
	debug: process.env.NODE_ENV === 'development',
	session: { strategy: 'jwt' },
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_JWT_SECRET,
};
export default NextAuth(authOptions);
