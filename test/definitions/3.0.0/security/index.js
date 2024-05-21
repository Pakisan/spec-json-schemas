describe('Security Schemes', () => {
  require('./apiKey/apiKey.js');
  require('./asymmetricEncryption/asymmetricEncryption.js');
  require('./gssapi/gssapi.js');
  require('./openIdconnect/openIdconnect.js');
  require('./plain/plain.js');
  require('./scramSha256/scramSha256.js');
  require('./scramSha512/scramSha512.js');
  require('./symmetricEncryption/symmetricEncryption.js');
  require('./userPassword/userPassword.js');
});
