import "../globals.scss";
import { UserProvider } from '@/context/userContext'
import { ProfileProvider } from '@/context/profileContext';

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<ProfileProvider>
				<Component {...pageProps} />
			</ProfileProvider>
		</UserProvider>
	)
}
