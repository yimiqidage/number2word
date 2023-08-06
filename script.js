const copyDiv = document.getElementById("copyDiv");
const copyBtn = document.getElementById("copyBtn");
const outputText = document.getElementById("outputText");
// const decodeBtn = document.getElementById("decodeBtn");
// const encodeBtn = document.getElementById("encodeBtn");
const swapBtn = document.getElementById("swapBtn");
const number2wordBtn = document.getElementById("number2wordBtn");
let originalButtonText = copyBtn.textContent;

function handleCopyClick() {
	const textToCopy = outputText.value.trim();
	if (textToCopy === "") {
		// empty content
		copyBtn.textContent = "The content is empty, please encode or decode it first.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
		return;
	}
	// Copy text to clipboard
	const textArea = document.createElement("textarea");
	textArea.value = textToCopy;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
	// Change button text to "Copied" and revert after 1.5 seconds
	copyBtn.textContent = "Copied";
	setTimeout(() => {
		copyBtn.textContent = originalButtonText;
	}, 1500);
}

/**
 * 数字转近似读音文字
 * @param number
 * @returns {string}
 */
function numberToSimilarChinese() {
	console.log("aaabb,",inputText.value.trim())
	const number = inputText.value.trim();
	if (number === "") {
		outputText.value = "";
		return;
	}
	const mapping = {
		'0': ['铃','零','灵','玲','凌'],
		'1': ['依','衣','壹','揖','伊','依','铱','壹','壹','铱'],
		'2': ['尔','洱','而','儿','耳','两'],
		'3': ['散','伞','仨','撒','萨'],
		'4': ['思','似','斯','丝','司','撕','寺','肆','泗','厮','饲'],
		'5': ['午','物','武','舞','伍','吾','捂','芜','雾','巫','鹉'],
		'6': ['留','流','刘','溜','陆','榴','骝'],
		'7': ['骑','期','器','齐','气','琪','旗','棋','漆','其','奇','欺'],
		'8': ['把','吧','巴','拔','罢','霸','扒','坝','疤','靶','芭','叭','粑'],
		'9': ['就','久','救','酒','旧','灸','究','玖','疚','韭','纠','揪','汣']
	};

	const numberStr = number.toString();
	let result = '';

	for (const digit of numberStr) {
		const chineseChars = mapping[digit];
		if (chineseChars && chineseChars.length > 0) {
			const selectedChar = chineseChars[Math.floor(Math.random() * chineseChars.length)];
			result += selectedChar;
		}
	}

	outputText.value = result;
}

function decodeBase64() {
	const inputTextValue = inputText.value.trim();
	if (inputTextValue === "") {
		outputText.value = "";
		return;
	}

	try {
		// Decode the Base64 encoded string to a Uint8Array
		const decoder = new TextDecoder();
		const decodedArray = new Uint8Array(atob(inputTextValue).split('').map(char => char.charCodeAt(0)));

		// Convert the Uint8Array to a human-readable string
		const decodedText = decoder.decode(decodedArray);

		outputText.value = decodedText;
		copyBtn.textContent = "Base64 decoding complete.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
	} catch (error) {
		copyBtn.textContent = "Decoding failed, please make sure the input is a valid Base64 encoding.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
	}
}

function encodeBase64() {
	const inputTextValue = inputText.value.trim();
	if (inputTextValue === "") {
		outputText.value = "";
		return;
	}

	// Convert input text to a Uint8Array
	const encoder = new TextEncoder();
	const inputArray = encoder.encode(inputTextValue);

	// Base64 encode the Uint8Array
	const base64String = btoa(String.fromCharCode(...inputArray));

	outputText.value = base64String;
	copyBtn.textContent = "Base64 encoding complete";
	setTimeout(() => {
		copyBtn.textContent = originalButtonText;
	}, 1500);
}

function swapValues() {
	const temp = inputText.value;
	inputText.value = outputText.value;
	outputText.value = temp;
}

copyBtn.addEventListener("click", handleCopyClick);
copyDiv.addEventListener("click", handleCopyClick);
// decodeBtn.addEventListener("click", decodeBase64);
// encodeBtn.addEventListener("click", encodeBase64);
number2wordBtn.addEventListener("click", numberToSimilarChinese);
swapBtn.addEventListener("click", swapValues);
swapBtn.addEventListener("click", swapValues);