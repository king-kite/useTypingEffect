import { useCallback, useEffect, useState } from "react";

type TypingProps = {
	startTime?: number;
	clearSpeed?: number;
	initValue?: number;
	items: string[];
	typingSpeed?: number;
	delayTime?: number;
}

const useTypingEffect = ({ 
	startTime = 500, // Start Typing After 500 milliseconds
	clearSpeed = 100, // Clear Each Character At A Speed Of 100 milliseconds
	initValue = 0, // Array index of the first item to be displayed
	items, // List of Strings
	typingSpeed = 100, // Type Each Character At A Speed Of 100 milliseconds
	delayTime = 3000 // Wait For 3000 milliseconds before clearing the current item
}: TypingProps) => {
	const [counter, setCounter] = useState<number>(initValue); // State value to hold the current index 
	const [itemTitle, setItemTitle] = useState(""); // The endresult

	const item = items[counter] || ""; // Current Item

	let setItemTimeout: any, clearItemTimeout: any; // Declared Timeouts for writing and clearing the item

	const clearItem = useCallback(() => {
		for (let i = -1; i >= -item.length; i--) {
			clearItemTimeout = setTimeout(() => {
				setItemTitle(item.slice(0, i));
				if (i === -item.length) {
					if (counter < 0 || counter >= items.length - 1) setCounter(0);
					else setCounter(counter + 1);
				}
			}, delayTime + i * -clearSpeed);
		}
	}, [item]);

	const setItem = useCallback(() => {
		if (item) {
			for (let i = 0; i <= item.length; i++) {
				setItemTimeout = setTimeout(() => {
					setItemTitle(item.slice(0, i));
					if (i === item.length) {
						clearItem();
					}
				}, startTime + i * typingSpeed);
			}
		}
	}, [item]);

	useEffect(() => {
		setItem();

		return () => {
			clearTimeout(clearItemTimeout);
			clearTimeout(setItemTimeout);
		};
	}, [counter]);

	return {
		value: itemTitle
	};
};

export default useTypingEffect;
