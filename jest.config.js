/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: ["src"],
  rootDir : "./src",
  moduleNameMapper: {
      "^@Components(.*)$"     : "<rootDir>/components$1",
      "^@Pages(.*)$"          : "<rootDir>/components/pages$1",
      "^@MatchService(.*)$"   : "<rootDir>/services/matches$1",
      "^@AuthService(.*)$"    : "<rootDir>/services/auth$1",
      "^@Services(.*)$"       : "<rootDir>/services$1",
      "^@CommonEnums(.*)$"    : "<rootDir>/common/enums$1",
      "^@Common(.*)$"         : "<rootDir>/common$1",
      "^@Root(.*)$"           : "<rootDir>$1",
      "^@Theme(.*)$"          : "<rootDir>/theme$1",
      "^@Routes(.*)$"          : "<rootDir>/routes$1"

  }
};