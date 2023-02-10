import React, { useContext, useState } from "react";
export type LoadingContextType = {
	isLoading: boolean;
	setLoading: (bool: boolean) => void;
};
const LoadingContext = React.createContext<LoadingContextType>({
	isLoading: false,
	setLoading: () => {},
});

export const LoadingContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				setLoading: (bool) => {
					setIsLoading(bool);
				},
			}}
		>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading should be used inside LoadingContextProvider");
	}
	return context;
};
