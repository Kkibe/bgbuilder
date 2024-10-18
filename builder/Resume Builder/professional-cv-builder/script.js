/* ************************************************
 ** Smart Wizard ***********************************
 ************************************************ */

var highSchool = document.getElementById("high-school");
var college = document.getElementById("college");
var career = document.getElementById("career");
var graduate = document.getElementById("graduate");
var international = document.getElementById("international");

var main = document.getElementById("mainQuestions");
var hsQuestions = document.getElementById("hsQuestions");
var hsQuestions2 = document.getElementById("hsQuestions2");
var collegeQuestions = document.getElementById("collegeQuestions");
var careerQuestions = document.getElementById("careerQuestions");
var graduateQuestions = document.getElementById("graduateQuestions");
var internationalQuestions = document.getElementById("internationalQuestions");

// Check first/main question
function checkMain() {
	if (highSchool.checked === true) {
		main.className += " hide";
		hsQuestions.classList.remove("hide");
	} else if (college.checked === true) {
		main.className += " hide";
		collegeQuestions.classList.remove("hide");
	} else if (career.checked === true) {
		main.className += " hide";
		careerQuestions.classList.remove("hide");
	} else if (graduate.checked === true) {
		main.className += " hide";
		graduateQuestions.classList.remove("hide");
	} else if (international.checked === true) {
		main.className += " hide";
		internationalQuestions.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

// Check for 1st block of HS questions
function checkHs1() {
	if (hsTestPrep.checked === true) {
		hsQuestions.className += " hide";
		hsQuestions2.classList.remove("hide");
	} else if (hsBasicSkills.checked === true) {
		hsQuestions.className += " hide";
		hsBasicSkillsLinks.classList.remove("hide");
	} else if (hsSearch.checked === true) {
		hsQuestions.className += " hide";
		hsSearchLinks.classList.remove("hide");
	} else if (hsCareerAdvice.checked === true) {
		hsQuestions.className += " hide";
		hsCareerAdviceLinks.classList.remove("hide");
	} else if (hsEquivalency.checked === true) {
		hsQuestions.className += " hide";
		hsEquivalencyLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

// Check for 2nd block of HS questions
function checkHs2() {
	if (hsApSat.checked === true) {
		hsQuestions2.className += " hide";
		hsApSatLinks.classList.remove("hide");
	} else if (hsExam.checked === true) {
		hsQuestions2.className += " hide";
		hsExamLinks.classList.remove("hide");
	} else if (hsCollegeExam.checked === true) {
		hsQuestions2.className += " hide";
		hsCollegeExamLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

// Check for College questions
function checkCollege() {
	if (colSearch.checked === true) {
		collegeQuestions.className += " hide";
		colSearchLinks.classList.remove("hide");
	} else if (colExam.checked === true) {
		collegeQuestions.className += " hide";
		colExamLinks.classList.remove("hide");
	} else if (colCareerAdvice.checked === true) {
		collegeQuestions.className += " hide";
		colCareerAdviceLinks.classList.remove("hide");
	} else if (colTakeTest.checked === true) {
		collegeQuestions.className += " hide";
		colTakeTestLinks.classList.remove("hide");
	} else if (colCreateResume.checked === true) {
		collegeQuestions.className += " hide";
		colCreateResumeLinks.classList.remove("hide");
	} else if (colBasicSkills.checked === true) {
		collegeQuestions.className += " hide";
		colBasicSkillsLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

function checkCareer() {
	if (carCreateResume.checked === true) {
		careerQuestions.className += " hide";
		carCreateResumeLinks.classList.remove("hide");
	} else if (carCareerExam.checked === true) {
		careerQuestions.className += " hide";
		carExamLinks.classList.remove("hide");
	} else if (carActWorkkeys.checked === true) {
		careerQuestions.className += " hide";
		carActWorkkeysLinks.classList.remove("hide");
	} else if (carBasicSkills.checked === true) {
		careerQuestions.className += " hide";
		carBasicSkillsLinks.classList.remove("hide");
	} else if (carHsEquivalency.checked === true) {
		careerQuestions.className += " hide";
		carHsEquivalencyLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

function checkGrad() {
	if (gradSearch.checked === true) {
		graduateQuestions.className += " hide";
		gradSearchLinks.classList.remove("hide");
	} else if (gradExam.checked === true) {
		graduateQuestions.className += " hide";
		gradExamLinks.classList.remove("hide");
	} else if (gradCreateResume.checked === true) {
		graduateQuestions.className += " hide";
		gradCreateResumeLinks.classList.remove("hide");
	} else if (gradCareerAdvice.checked === true) {
		graduateQuestions.className += " hide";
		gradCareerAdviceLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

function checkInt() {
	if (intPrep.checked === true) {
		internationalQuestions.className += " hide";
		intPrepLinks.classList.remove("hide");
	} else if (intUsCitizen.checked === true) {
		internationalQuestions.className += " hide";
		intUsCitizenLinks.classList.remove("hide");
	} else if (intBasicSkills.checked === true) {
		internationalQuestions.className += " hide";
		intBasicSkillsLinks.classList.remove("hide");
	} else {
		alert("Please make a selection.");
	}
}

// Change button onClick functions
function buttons() {}