import "@styles/globals.css";
import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../Theme";
import Layout from "@components/layout/Layout";

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}
