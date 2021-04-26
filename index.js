function setupTypewriter(t) {
	var HTML = t.innerHTML;

	t.innerHTML = "";

	var cursorPosition = 0,
		tag = "",
		writingTag = false,
		tagOpen = false,
		typeSpeed = 1;
	tempTypeSpeed = 0;

	var type = function () {
		if (writingTag === true) {
			tag += HTML[cursorPosition];
		}

		if (HTML[cursorPosition] === "<") {
			tempTypeSpeed = 0;
			if (tagOpen) {
				tagOpen = false;
				writingTag = true;
			} else {
				tag = "";
				tagOpen = true;
				writingTag = true;
				tag += HTML[cursorPosition];
			}
		}
		if (!writingTag && tagOpen) {
			tag.innerHTML += HTML[cursorPosition];
		}
		if (!writingTag && !tagOpen) {
			if (HTML[cursorPosition] === " ") {
				tempTypeSpeed = 0;
			} else {
				tempTypeSpeed = Math.random() * typeSpeed + 50;
			}
			t.innerHTML += HTML[cursorPosition];
		}
		if (writingTag === true && HTML[cursorPosition] === ">") {
			tempTypeSpeed = Math.random() * typeSpeed + 50;
			writingTag = false;
			if (tagOpen) {
				var newSpan = document.createElement("span");
				t.appendChild(newSpan);
				newSpan.innerHTML = tag;
				tag = newSpan.firstChild;
			}
		}

		cursorPosition += 1;
		if (cursorPosition < HTML.length - 1) {
			setTimeout(type, tempTypeSpeed);
		}
	};

	return {
		type: type,
	};
}

var typer = document.getElementById("typewriter");

var typewriter1 = setupTypewriter(typer);

typewriter1.type();

// -----------------------------------------------------------------------------
// delete effect
// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
	a = 0,
	isBackspacing = false,
	isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".
var textArray = [
	"I like jogging and hiking.",
	"One of my bucket list is to complete triathlon before 40 years old.",
	"I like animals. Among them, dog is my favorite.",
	"Coding is both the best fun and the most stress.Lol",
	"I like traveling.",
	"So I try to go to new place or new country I have never visited in every vacation.",
	"I like watching movie, especially action movies.",
	"",
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
	speedWait = 2500, // Wait between typing and backspacing
	speedBetweenLines = 1000, //Wait between first and second lines
	speedBackspace = 25; //Backspace Speed

//Run the loop
setTimeout(() => {
	typeWriter("output", textArray);
}, 15000);

function typeWriter(id, ar) {
	const element = $("#" + id),
		aString = ar[a],
		eHeader = element.children("h1"), //Header element
		eParagraph = element.children("p"); //Subheader element

	// Determine if animation should be typing or backspacing
	if (!isBackspacing) {
		// If full string hasn't yet been typed out, continue typing
		if (i < aString.length) {
			// If character about to be typed is a pipe, switch to second line and continue.
			if (aString.charAt(i) == "|") {
				isParagraph = true;
				eHeader.removeClass("cursor");
				eParagraph.addClass("cursor");
				i++;
				setTimeout(function () {
					typeWriter(id, ar);
				}, speedBetweenLines);

				// If character isn't a pipe, continue typing.
			} else {
				// Type header or subheader depending on whether pipe has been detected
				if (!isParagraph) {
					eHeader.text(eHeader.text() + aString.charAt(i));
				} else {
					eParagraph.text(eParagraph.text() + aString.charAt(i));
				}
				i++;
				setTimeout(function () {
					typeWriter(id, ar);
				}, speedForward);
			}

			// If full string has been typed, switch to backspace mode.
		} else if (i == aString.length) {
			isBackspacing = true;
			setTimeout(function () {
				typeWriter(id, ar);
			}, speedWait);
		}

		// If backspacing is enabled
	} else {
		// If either the header or the paragraph still has text, continue backspacing
		if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
			// If paragraph still has text, continue erasing, otherwise switch to the header.
			if (eParagraph.text().length > 0) {
				eParagraph.text(
					eParagraph.text().substring(0, eParagraph.text().length - 1)
				);
			} else if (eHeader.text().length > 0) {
				eParagraph.removeClass("cursor");
				eHeader.addClass("cursor");
				eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
			}
			setTimeout(function () {
				typeWriter(id, ar);
			}, speedBackspace);

			// If neither head or paragraph still has text, switch to next quote in array and start typing.
		} else {
			isBackspacing = false;
			i = 0;
			isParagraph = false;
			a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
			setTimeout(function () {
				typeWriter(id, ar);
			}, 50);
		}
	}
}
