module.exports = {
	"env": {
		"browser": true,
		node: true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"semi": [
			"warn",
			"always"
		],
		"no-unused-vars": 0,
		"no-undef": "off"
	}
};
