/*global overwolf*/

let _launchSource = _detectLaunchSource();

function _detectLaunchSource() {
	let source = _getUrlParameterByName('source');
	return source;
}

function _getUrlParameterByName(name) {
	let regex, results;
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	results = regex.exec(window.location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLaunchSource() {
	return _launchSource;
}

export default {
	getLaunchSource
}