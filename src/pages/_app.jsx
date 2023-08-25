import "@styles/globals.css";
import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../Theme";
import Loader from "@components/loader/Loader";

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<Loader />}>
				<Component {...pageProps} />
			</Suspense>
		</ThemeProvider>
	);
}
